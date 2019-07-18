import React, { ChangeEvent, FC, useEffect, useState } from "react"

import './WebSocketClient.scss'

// NOTE: create socket to echo server (use secure protocol, i.e. `wss` not `ws`)
const secureWebSocketProto = 'wss://'

let webSocketClient: WebSocket
try {
	webSocketClient = new WebSocket(`${secureWebSocketProto}localhost:5001/ws`)
// } catch(err) {
} catch {
	// console.warn(`failed to connect to web socket server`, err)
	console.warn(`failed to connect to web socket server`)
}

// NOTE: using an undefined-safe operator here
webSocketClient!.onopen = evt => {
	console.info('web socket is opened! sending message to server...')
	// appendToLog('web socket is opened! sending message to server...')
	const webSocketTarget: WebSocket = evt.target as WebSocket
	// NOTE: send message to server
	webSocketTarget.send('ello!!!')
}

const WebSocketClient: FC = () => {
	const [currentMessage, setCurrentMessage] = useState('')
	const [logLines, setLogLines] = useState<string[]>([])
	// const [webSocketClient, setWebSocketClient] = useState<WebSocket>()
	// let webSocketClient: WebSocket

	const appendToLog = (msg: string, emitToConsole = false) => {
		if (emitToConsole) {
			console.log(msg)
		}
		setLogLines(logLines => logLines.concat(msg))
	}

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {
		if (!webSocketClient) {
			return
		}
		appendToLog('closing web socket...')
		webSocketClient.close()
	}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		appendToLog('component mounted')
		// NOTE: create socket to echo server (use secure protocol, i.e. `wss` not `ws`)
		// const secureWebSocketProto = 'wss://'
		// webSocketClient = new WebSocket(`${secureWebSocketProto}localhost:5001/ws`)

		webSocketClient.onclose = evt => {
			appendToLog(`web socket closed: ${evt.reason} [timestamp=${evt.timeStamp}]`)
		}

		webSocketClient.onmessage = evt => {
			const { data, target, type } = evt
			const webSocketTarget: WebSocket = target as WebSocket
			appendToLog(`message received from="${webSocketTarget.url}" type="${type}" data="${data}"`)
		}

		return handleUnmount
	}

	const handleCurrentMessageChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const { target } = evt
		const { value } = target
		setCurrentMessage(value)
	}

	const handleSendToServer = () => {
		appendToLog(`sending message to server=${currentMessage}`)
		if (!webSocketClient) {
			console.warn('web socket client not available', webSocketClient)
			return
		}
		webSocketClient.send(currentMessage)
		setCurrentMessage('')
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	return (
		<article className="websocket-client">
			<h1>Web Socket Client</h1>
			<section>
				<h2>Log</h2>
				{/* <textarea cols={80} rows={12} value={logLines} /> */}
				{/* <textarea cols={80} rows={12} value={logLines.map(logLine => `${logLine}\n`)} /> */}
				<textarea cols={80} rows={12} value={logLines.join('\n')} readOnly={true} />
			</section>
			<section>
				<input type="text" value={currentMessage}
					onChange={handleCurrentMessageChange}
					placeholder="Enter message to send to server..." />
				<button onClick={handleSendToServer}>Send</button>
			</section>
		</article>
	)
}

export { WebSocketClient }
