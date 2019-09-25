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
// import { WebSocketClient } from '../WebSocketClient/WebSocketClient'

import { CritterState } from '../../state/CritterState/CritterState'
import { MoneyState } from '../../state/MoneyState/MoneyState'
import { UpgradeState } from '../../state/UpgradeState/UpgradeState'

import './App.scss'

const App: FC = () => {
	const moneyState = new MoneyState(0)
	const upgradeState = new UpgradeState()

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
					{/*
					<Link to="/webSocket">Web Socket</Link>
					*/}
					<Switch>
						<Route exact={true} path="/">
							<CritterList critterState={new CritterState(moneyState.money, [])} />
						</Route>
						<Route path="/money">
							<MoneyControls />
						</Route>
						{/*
						<Route path="/webSocket">
							<WebSocketClient />
						</Route>
						*/}
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
