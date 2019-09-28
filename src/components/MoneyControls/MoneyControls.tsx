// import React, { useEffect, useState } from 'react'
import React, { useState } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_COST,
	GATHERER_INCOME,
	GATHERER_INITIAL_TICK,
	GATHERER_TICK_RATE,
	GATHERER_TIME_SECONDS
} from '../../constants'

import { Modal } from '../../components/Modal/Modal'
import { AutoSave } from '../../model/AutoSave'
import {
	initGatherROILevel,
	initGatherSpeedLevel,
	initMoney,
	initNumGatherers
} from '../../state/initializers'
import { monify } from '../utils'

import './MoneyControls.scss'

const MoneyControls = () => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [gatherROILevel, setGatherROILevel] = useState(initGatherROILevel)
	const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [isShowingModal, setIsShowingModal] = useState(true)
	const [money, setMoney] = useState(initMoney)
	const [numGatherers, setNumGatherers] = useState(initNumGatherers)

	const addGatherer = () => {
		setMoney(staleMoney => staleMoney - GATHERER_COST)
		setNumGatherers(staleGatherers => staleGatherers + 1)
	}
	const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	const calculateGathererIncome = (): number => numGatherers * GATHERER_INCOME * (gatherROILevel + 1)
	const collectFromGatherers = () => addMoney(calculateGathererIncome())
	const executeGatherTick = () => {
		if (numGatherers < 1) {
			return
		}
		if (gathererTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			collectFromGatherers()
			setGathererTick(GATHERER_INITIAL_TICK)
			return
		}
		setGathererTick(staleGathererTick => staleGathererTick + 1)
	}
	const getGathererUpgradeCost = (): number => Math.pow(gatherROILevel + 1, 2) * 100
	const handleUpgradeGatherers = () => {
		addMoney(-1 * getGathererUpgradeCost())
		upgradeGatherers()
	}
	const upgradeGatherers = () => setGatherROILevel(staleGatherROILevel => staleGatherROILevel + 1)
	const resetProgress = () => {
		setMoney(0)
		setNumGatherers(0)
		setGatherROILevel(0)
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

	useInterval(executeGatherTick, 1000 / GATHERER_TICK_RATE / gatherSpeedLevel)
	useInterval(() => AutoSave.saveToLocal(gatherROILevel, gatherSpeedLevel, money, numGatherers), 1000)

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
						<p>Gatherer Level: {gatherROILevel}</p>
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
