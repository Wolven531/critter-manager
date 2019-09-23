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
import { UpgradeState } from '../../state/UpgradeState/UpgradeState'

import { Modal } from '../../components/Modal/Modal'
import { monify } from '../utils'

import './MoneyControls.scss'

interface IMoneyControlsProps {
	upgradeState: UpgradeState
}

const MoneyControls = ({ upgradeState }: IMoneyControlsProps) => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)

	const [money, setMoney] = useState(() => {
		const moneyStr = window.localStorage.getItem('critter-manager.money')
		if (!moneyStr || moneyStr.length < 1) {
			return 0
		}
		return parseInt(moneyStr, 10)
	})
	const [numGatherers, setNumGatherers] = useState(() => {
		const gathererStr = window.localStorage.getItem('critter-manager.gatherers')
		if (!gathererStr || gathererStr.length < 1) {
			return 0
		}
		return parseInt(gathererStr, 10)
	})

	const addGatherer = () => {
		setNumGatherers(staleGatherers => staleGatherers + 1)
		setMoney(staleMoney => staleMoney - GATHERER_COST)
	}
	const addMoney = (funds = 1) => {
		setMoney(staleMoney => staleMoney + funds)
	}
	const calculateGathererIncome = (gatherLevel = 1): number => {
		return numGatherers * GATHERER_INCOME * (gatherLevel > 0 ? gatherLevel : 1)
	}
	const collectFromGatherers = (gatherLevel = 1) => {
		addMoney(calculateGathererIncome(gatherLevel))
	}
	const resetProgress = () => {
		setMoney(0)
		setNumGatherers(0)
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
		addMoney(-1 * upgradeState.getGathererUpgradeCost())
		upgradeState.upgradeGatherers()
	}

	useInterval(() => {
		if (numGatherers < 1) {
			return
		}
		if (gathererTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			setGathererTick(GATHERER_INITIAL_TICK)
			collectFromGatherers(upgradeState.gathererLevel)
			return
		}
		setGathererTick(gathererTick + 1)
	}, 1000 / GATHERER_TICK_RATE)

	useInterval(() => {
		window.localStorage.setItem('critter-manager.money', JSON.stringify(money))
		window.localStorage.setItem('critter-manager.gatherers', JSON.stringify(numGatherers))
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
						Gatherers: {numGatherers}
						<br/>
						Gatherer Level: {upgradeState.gathererLevel}
						<br/>
						Gatherer Income = ${calculateGathererIncome(upgradeState.gathererLevel)}
						<br/>
						<button className="upgrade"
							disabled={money < upgradeState.getGathererUpgradeCost()}
							onClick={() => { handleUpgradeGatherers() }}>Upgrade Gatherers ({upgradeState.getGathererUpgradeCost()})</button>
						<br/>
						<progress value={gathererTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
					</article>}
				<article>
					<button className="add-money"
						onClick={() => { addMoney() }}>Add Money</button>
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
