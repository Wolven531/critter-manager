// import React, { useEffect, useState } from 'react'
import React, { useContext, useState } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_COST,
	GATHERER_INCOME,
	GATHERER_INITIAL_TICK,
	GATHERER_TICK_RATE,
	GATHERER_TIME_SECONDS,
	STORAGEKEY_GATHERERS,
	STORAGEKEY_GATHERLEVEL,
	STORAGEKEY_MONEY
} from '../../constants'

import { Modal } from '../../components/Modal/Modal'
import { monify } from '../utils'

import './MoneyControls.scss'

const MoneyContext = React.createContext({
	money: 0
})
const MoneyProvider = (props: any) => {
	const moneyInformation = {
		money: 0
	}
	const [moneyInfo, setMoneyInfo] = useState(moneyInformation)

	return (
		<MoneyContext.Provider value={moneyInfo}>
			{props.children}
		</MoneyContext.Provider>
	)
}

const GathererContext = React.createContext({
	addGatherer: () => { return },
	calculateGathererIncome: (): number => 0,
	gatherLevel: 0,
	gatherTick: GATHERER_INITIAL_TICK,
	getGathererUpgradeCost: (): number => 0,
	handleUpgradeGatherers: () => { return },
	numGatherers: 0
})
const GathererProvider = (props: any) => {
	const gatherInformation = {
		addGatherer: () => {
			setGatherInfo({
				...gatherInfo,
				numGatherers: gatherInfo.numGatherers + 1
			})
			// setMoney(staleMoney => staleMoney - GATHERER_COST)
		},
		calculateGathererIncome: (): number => gatherInfo.numGatherers * GATHERER_INCOME * (gatherInfo.gatherLevel + 1),
		gatherLevel: 0,
		gatherTick: GATHERER_INITIAL_TICK,
		getGathererUpgradeCost: (): number => Math.pow(gatherInfo.gatherLevel + 1, 2) * 100,
		handleUpgradeGatherers: () => {
			// addMoney(-1 * getGathererUpgradeCost())
			setGatherInfo({
				...gatherInfo,
				gatherLevel: gatherInfo.gatherLevel + 1
			})
		},
		numGatherers: 0
	}
	const [gatherInfo, setGatherInfo] = useState(gatherInformation)

	const gathererStr = window.localStorage.getItem(STORAGEKEY_GATHERERS)
	if (gathererStr && gathererStr.length > 0) {
		gatherInformation.numGatherers = parseInt(gathererStr, 10)
	}
	const gatherLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERLEVEL)
	if (gatherLevelStr && gatherLevelStr.length > 0) {
		gatherInformation.gatherLevel = parseInt(gatherLevelStr, 10)
	}

	return (
		<GathererContext.Provider value={gatherInfo}>
			{props.children}
		</GathererContext.Provider>
	)
}

const MoneyControlsUsingContext = () => {
	const gatherContext = useContext(GathererContext)
	const moneyContext = useContext(MoneyContext)

	return (
		<GathererProvider>
			<article>
				<p>Gatherers: {gatherContext.numGatherers}</p>
				<p>Gatherer Level: {gatherContext.gatherLevel}</p>
				<p>Gatherer Income = ${gatherContext.calculateGathererIncome()}</p>
				<button className="buy-gatherer"
					disabled={moneyContext.money < GATHERER_COST}
					onClick={() => { gatherContext.addGatherer() }}>
						Buy Gatherer ({GATHERER_COST})
				</button>
				<button className="upgrade"
					disabled={moneyContext.money < gatherContext.getGathererUpgradeCost()}
					onClick={() => { gatherContext.handleUpgradeGatherers() }}>
						Upgrade Gatherers ({gatherContext.getGathererUpgradeCost()})
				</button>
				<progress value={gatherContext.gatherTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
			</article>
		</GathererProvider>
	)
}

const MoneyControls = () => {
	// const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)

	const [money, setMoney] = useState((): number => {
		const moneyStr = window.localStorage.getItem(STORAGEKEY_MONEY)
		if (!moneyStr || moneyStr.length < 1) {
			return 0
		}
		return parseInt(moneyStr, 10)
	})
	// const [numGatherers, setNumGatherers] = useState((): number => {
	// 	const gathererStr = window.localStorage.getItem(STORAGEKEY_GATHERERS)
	// 	if (!gathererStr || gathererStr.length < 1) {
	// 		return 0
	// 	}
	// 	return parseInt(gathererStr, 10)
	// })
	// const [gatherLevel, setGatherLevel] = useState((): number => {
	// 	const gatherLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERLEVEL)
	// 	if (!gatherLevelStr || gatherLevelStr.length < 1) {
	// 		return 0
	// 	}
	// 	return parseInt(gatherLevelStr, 10)
	// })

	// const addGatherer = () => {
	// 	setMoney(staleMoney => staleMoney - GATHERER_COST)
	// 	setNumGatherers(staleGatherers => staleGatherers + 1)
	// }
	const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	// const calculateGathererIncome = (): number => numGatherers * GATHERER_INCOME * (gatherLevel + 1)
	// const collectFromGatherers = () => addMoney(calculateGathererIncome())
	// const getGathererUpgradeCost = (): number => Math.pow(gatherLevel + 1, 2) * 100
	// const upgradeGatherers = () => setGatherLevel(staleGatherLevel => staleGatherLevel + 1)
	const resetProgress = () => {
		setMoney(0)
		// setNumGatherers(0)
		// setGatherLevel(0)
	}

	// // NOTE: This happens before un-render (only once)
	// const handleUnmount = () => {
	// 	return
	// }

	// // NOTE: This happens after render (only once)
	// const handleMounted = () => {
	// 	return handleUnmount
	// }

	// // NOTE: empty (no arg) to track nothing, fires on mount/unmount
	// useEffect(handleMounted, [])

	// const handleUpgradeGatherers = () => {
	// 	addMoney(-1 * getGathererUpgradeCost())
	// 	upgradeGatherers()
	// }

	useInterval(() => {
		// if (numGatherers < 1) {
		// 	return
		// }
		// if (gathererTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
		// 	collectFromGatherers()
		// 	setGathererTick(GATHERER_INITIAL_TICK)
		// 	return
		// }
		// setGathererTick(staleGathererTick => staleGathererTick + 1)
	}, 1000 / GATHERER_TICK_RATE)

	// auto-save functionality
	useInterval(() => {
		window.localStorage.setItem(STORAGEKEY_MONEY, JSON.stringify(money))
		// window.localStorage.setItem(STORAGEKEY_GATHERERS, JSON.stringify(numGatherers))
		// window.localStorage.setItem(STORAGEKEY_GATHERLEVEL, JSON.stringify(gatherLevel))
	}, 1000)

	return (
		<article className="money-controls">
			{isShowingModal && (
				<Modal handleModalDialogClose={() => { setIsShowingModal(false) }}>
					<article>
						<h1>Welcome to Critter Manager!</h1>
						<button onClick={() => { resetProgress() }}>Reset Progress</button>
					</article>
				</Modal>)}
			<section>
				<p>Money: {monify(money)}</p>
				<article>
					<button className="add-money" onClick={() => { addMoney() }}>Add Money</button>
				</article>
				<MoneyControlsUsingContext />
			</section>
		</article>
	)
}

export { MoneyControls }
