import React, { FC, useEffect } from 'react'
// import { Router } from 'react-router'
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch
} from 'react-router-dom'

import { CritterList } from '../../views/CritterList/CritterList'
import { MoneyControls } from '../MoneyControls/MoneyControls'
import { PageNotFound } from '../PageNotFound/PageNotFound'
import { WebSocketClient } from '../WebSocketClient/WebSocketClient'

import { CritterState } from '../../state/CritterState'
import { UpgradeStore } from '../../state/upgradeStore'
import { useMoneyState } from '../../state/useMoneyState'

import './App.scss'

const App: FC = () => {
	const moneyState = useMoneyState(0)
	const upgradeStore = new UpgradeStore()

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {
		return
	}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Critter Manager'

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// console.info(`About to render`)

	return (
		<article className="app">
			<Router>
				<div>
					<Link to="/">Critter List</Link>
					<br/>
					<Link to="/money">Money</Link>
					<br/>
					<Link to="/webSocket">Web Socket</Link>
					<Switch>
						<Route exact={true} path="/">
							<CritterList critterState={new CritterState(moneyState.money, [])} />
						</Route>
						<Route path="/money">
							<MoneyControls moneyState={moneyState} upgradeStore={upgradeStore} />
						</Route>
						<Route path="/webSocket">
							<WebSocketClient />
						</Route>
						<Route>
							<PageNotFound />
						</Route>
					</Switch>
				</div>
			</Router>
		</article>
	)
}

export default App
