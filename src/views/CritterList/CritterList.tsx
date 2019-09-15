import React, { Component } from 'react'

import { Critter } from '../../components/Critter/Critter'
import { CritterListControls } from '../../components/CritterListControls/CritterListControls'

import { COMBAT_COST } from '../../service/combatService'

import { Critter as CritterModel } from '../../model/Critter'

import { CritterState } from '../../state/CritterState'

import './CritterList.scss'

export interface ICritterListProps {
	// currentMoney: number
	critterState: CritterState
}

class CritterList extends Component<ICritterListProps, {}> {
	private critterState: CritterState

	constructor(props: ICritterListProps) {
		super(props)
		// this.critterState = new CritterState(props.currentMoney, [])
		this.critterState = props.critterState || new CritterState(0, [])
	}

	public componentDidMount() {
		this.critterState.loadFromStorage()
	}

	public render() {
		// if (!this.critterState) {
		// 	return null
		// }

		const {
			clearCritters,
			critters,
			currentMoney,
			saveToLocalStorage,
			spawnCritter
		} = this.critterState

		return (
			<article className="critter-list">
				<CritterListControls
					canStartCombat={currentMoney >= COMBAT_COST}
					clearCritters={clearCritters}
					saveToLocalStorage={saveToLocalStorage}
					shouldShowCombat={true}
					spawnCritter={spawnCritter}
					startCombat={() => {}} />
				<section className="display-container">
					{critters.map((critter: CritterModel) => <Critter key={critter.id} critter={critter} />)}
				</section>
			</article>
		)
	}
}

export { CritterList }
