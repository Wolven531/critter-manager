import React, { useEffect, useState } from 'react'

import { useInterval } from '../../hooks/useInterval'

import {
	GATHERER_COST,
	GATHERER_INCOME,
	MoneyState
} from '../../state/MoneyState/MoneyState'
import { UpgradeState } from '../../state/UpgradeState/UpgradeState'

import { Modal } from '../../components/Modal/Modal'
import { monify } from '../utils'

import './MoneyControls.scss'

const GATHERER_INITIAL_TICK = 0
const GATHERER_TICK_RATE = 10
const GATHERER_TIME_SECONDS = 2

interface IMoneyControlsProps {
	moneyState: MoneyState
	upgradeState: UpgradeState
}

const MoneyControls = ({ moneyState, upgradeState }: IMoneyControlsProps) => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)

	const [money, setMoney] = useState(0)
	const [numGatherers, setNumGatherers] = useState(0)

	const addGatherer = () => {
		setNumGatherers(staleGatherers => staleGatherers + 1)
	}
	const addMoney = (funds = 1) => {
		setMoney(staleMoney => staleMoney + funds)
	}
	const calculateGathererIncome = (gatherLevel = 1): number => {
		return numGatherers + GATHERER_INCOME * (gatherLevel > 0 ? gatherLevel : 1)
	}
	const collectFromGatherers = (gatherLevel = 1) => {
		addMoney(calculateGathererIncome(gatherLevel))
	}
	const resetProgress = () => {
		setMoney(0)
		setNumGatherers(0)
	}

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {
		return
	}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		const loadedInfo = moneyState.loadFromStorage()

		if (loadedInfo) {
			for (let a = 0; a < loadedInfo.gathererLevel; a++) {
				upgradeState.upgradeGatherers()
			}
		}

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	const handleBuyGatherer = () => {
		addGatherer()
	}

	const handleModalDialogClose = () => {
		setIsShowingModal(false)
	}

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
		// console.info(`[${dateFormatter.format(Date.now())}] saving money..., ${money}`)
		moneyState.saveToStorage(upgradeState.gathererLevel)
	}, 1000)

	return (
		<article className="money-controls">
			{isShowingModal && (
			<Modal handleModalDialogClose={handleModalDialogClose}>
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
					onClick={handleBuyGatherer}>Buy Gatherer ({GATHERER_COST})</button>
			</section>
		</article>
	)
}

export { MoneyControls }
