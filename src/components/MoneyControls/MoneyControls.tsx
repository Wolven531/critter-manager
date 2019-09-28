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
	const [gatherROILevel, setGatherIncomeLevel] = useState(initGatherROILevel)
	const [gatherSpeedLevel, setGatherSpeedLevel] = useState(initGatherSpeedLevel)
	const [isShowingModal, setIsShowingModal] = useState(true)
	const [money, setMoney] = useState(initMoney)
	const [numGatherers, setNumGatherers] = useState(initNumGatherers)

	const addGatherer = () => {
		setMoney(staleMoney => staleMoney - GATHERER_COST)
		setNumGatherers(staleGatherers => staleGatherers + 1)
	}
	const addMoney = (funds = 1) => setMoney(staleMoney => staleMoney + funds)
	const calcGatherTime = (): number => 1000 / GATHERER_TICK_RATE / gatherSpeedLevel
	const calcGatherIncome = (): number => GATHERER_INCOME * (gatherROILevel + 1)
	const calcGatherIncomeUpgradeCost = (): number => Math.pow(gatherROILevel + 1, 2) * 33
	const calcGatherSpeedUpgradeCost = (): number => Math.pow(gatherSpeedLevel + 1, 3) * 66
	const calcGatherTotalIncome = (): number => numGatherers * calcGatherIncome()
	const collectFromGatherers = () => addMoney(calcGatherTotalIncome())
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
	const handleUpgradeGatherIncome = () => {
		addMoney(-1 * calcGatherIncomeUpgradeCost())
		setGatherIncomeLevel(staleGatherROILevel => staleGatherROILevel + 1)
	}
	const handleUpgradeGatherSpeed = () => {
		addMoney(-1 * calcGatherSpeedUpgradeCost())
		setGatherSpeedLevel(staleGatherSpeedLevel => staleGatherSpeedLevel + 1)
	}
	const resetProgress = () => {
		setMoney(0)
		setNumGatherers(0)
		setGatherIncomeLevel(0)
		setGatherSpeedLevel(1)
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

	useInterval(executeGatherTick, calcGatherTime())
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
						<p>Gatherers: {numGatherers} ({monify(calcGatherTotalIncome())} per collection)</p>
						<p>Gatherer Income Level: {gatherROILevel} ({monify(calcGatherIncome())} per gatherer)</p>
						<p>Gatherer Speed Level: {gatherSpeedLevel} (every {calcGatherTime().toFixed(2)} ms)</p>
						<button className="upgrade"
							disabled={money < calcGatherIncomeUpgradeCost()}
							onClick={() => { handleUpgradeGatherIncome() }}>
								Upgrade Gather ROI ({monify(calcGatherIncomeUpgradeCost())})
						</button>
						<br />
						<button className="upgrade"
							disabled={money < calcGatherSpeedUpgradeCost()}
							onClick={() => { handleUpgradeGatherSpeed() }}>
								Upgrade Gather Speed ({monify(calcGatherSpeedUpgradeCost())})
						</button>
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
					onClick={() => { addGatherer() }}>Buy Gatherer ({monify(GATHERER_COST)})</button>
			</section>
		</article>
	)
}

export { MoneyControls }
