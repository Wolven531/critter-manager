import { MutableRefObject, useEffect, useRef } from 'react'

// NOTE: Inspired by https://overreacted.io/making-setinterval-declarative-with-react-hooks/
const useInterval = (callback: () => void, delay?: number) => {
	const savedCallback: MutableRefObject<Function> = useRef() as MutableRefObject<Function>

	useEffect(() => {// store the latest callback
		savedCallback.current = callback
	}, [callback])// track on the callback provided

	useEffect(() => {// set up the interval
		// if (delay === undefined) {
		// 	return
		// }
		const id = setInterval(() => {// NOTE: this anon func is the tick
			savedCallback.current()
		}, delay)
		return () => { clearInterval(id) }// NOTE: cleanup func
	}, [delay])// track on the delay provided
}

export { useInterval }
