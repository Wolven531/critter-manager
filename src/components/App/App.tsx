import React, { FC, useEffect } from 'react'
// import { Router } from 'react-router'
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
  } from 'react-router-dom'

import { CritterList } from '../../views/CritterList/CritterList'
import { MoneyControls } from '../MoneyControls/MoneyControls'
import { WebSocketClient } from '../WebSocketClient/WebSocketClient'

import { UpgradeStore } from '../../state/upgradeStore'
import { useMoneyState } from '../../state/useMoneyState'

import './App.scss'

const App: FC = () => {
	const moneyState = useMoneyState(0)
	const upgradeStore = new UpgradeStore()

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

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
					<Link to="/">Critter List</Link>{' '}
					<Link to="/money">Money</Link>{' '}
					<Link to="/webSocket">Web Socket</Link>{' '}
					<Switch>
						<Route exact={true} path="/" render={() => <CritterList currentMoney={moneyState.money} />} />
						<Route path="/money" render={() => <MoneyControls moneyState={moneyState} upgradeStore={upgradeStore} />} />
						<Route path="/webSocket" component={WebSocketClient} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</div>
			</Router>
		</article>
	)
}

export default App
