// import React, { useEffect, useState } from 'react'
import React, { useState } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_COST,
	GATHERER_INCOME,
	GATHERER_INITIAL_TICK,
	GATHERER_TICK_RATE,
	GATHERER_TIME_SECONDS
} from '../../state/MoneyState/MoneyState'

import { Modal } from '../../components/Modal/Modal'
import { monify } from '../utils'

import './MoneyControls.scss'

const MoneyControls = () => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)

	const [money, setMoney] = useState((): number => {
		const moneyStr = window.localStorage.getItem('critter-manager.money')
		if (!moneyStr || moneyStr.length < 1) {
			return 0
		}
		return parseInt(moneyStr, 10)
	})
	const [numGatherers, setNumGatherers] = useState((): number => {
		const gathererStr = window.localStorage.getItem('critter-manager.gatherers')
		if (!gathererStr || gathererStr.length < 1) {
			return 0
		}
		return parseInt(gathererStr, 10)
	})
	const [gatherLevel, setGatherLevel] = useState((): number => {
		const gatherLevelStr = window.localStorage.getItem('critter-manager.gatherLevel')
		if (!gatherLevelStr || gatherLevelStr.length < 1) {
			return 0
		}
		return parseInt(gatherLevelStr, 10)
	})

	const addGatherer = () => {
		setMoney(staleMoney => staleMoney - GATHERER_COST)
		setNumGatherers(staleGatherers => staleGatherers + 1)
	}
	const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	const calculateGathererIncome = (): number => numGatherers * GATHERER_INCOME * (gatherLevel + 1)
	const collectFromGatherers = () => addMoney(calculateGathererIncome())
	const getGathererUpgradeCost = (): number => Math.pow(gatherLevel + 1, 2) * 100
	const upgradeGatherers = () => setGatherLevel(staleGatherLevel => staleGatherLevel + 1)
	const resetProgress = () => {
		setMoney(0)
		setNumGatherers(0)
		setGatherLevel(0)
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

	const handleUpgradeGatherers = () => {
		addMoney(-1 * getGathererUpgradeCost())
		upgradeGatherers()
	}

	useInterval(() => {
		if (numGatherers < 1) {
			return
		}
		if (gathererTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			setGathererTick(GATHERER_INITIAL_TICK)
			collectFromGatherers()
			return
		}
		setGathererTick(staleGathererTick => staleGathererTick + 1)
	}, 1000 / GATHERER_TICK_RATE)

	useInterval(() => {
		window.localStorage.setItem('critter-manager.money', JSON.stringify(money))
		window.localStorage.setItem('critter-manager.gatherers', JSON.stringify(numGatherers))
		window.localStorage.setItem('critter-manager.gatherLevel', JSON.stringify(gatherLevel))
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
				{numGatherers < 1
					? null
					: <article>
						<p>Gatherers: {numGatherers}</p>
						<p>Gatherer Level: {gatherLevel}</p>
						<p>Gatherer Income = ${calculateGathererIncome()}</p>
						<button className="upgrade"
							disabled={money < getGathererUpgradeCost()}
							onClick={() => { handleUpgradeGatherers() }}>Upgrade Gatherers ({getGathererUpgradeCost()})</button>
						<br />
						<progress value={gathererTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
					</article>}
				<article>
					<button className="add-money" onClick={() => { addMoney() }}>Add Money</button>
				</article>
			</section>
			<section>
				<button className="buy-gatherer"
					disabled={money < GATHERER_COST}
					onClick={() => { addGatherer() }}>Buy Gatherer ({GATHERER_COST})</button>
			</section>
		</article>
	)
}

export { MoneyControls }
