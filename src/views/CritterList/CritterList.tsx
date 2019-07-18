import React, { FC, useEffect } from 'react'

import { Critter } from '../../components/Critter/Critter'
import { CritterListControls } from '../../components/CritterListControls/CritterListControls'

import { COMBAT_COST } from '../../service/combatService'

import { useCritterState } from '../../state/useCritterState'

import './CritterList.scss'

export interface ICritterListProps {
	currentMoney: number
}

const CritterList: FC<ICritterListProps> = ({ currentMoney }) => {
	const { clearCritters, critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	useEffect(() => {
		loadFromStorage()
	}, [])

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
				{critters.map(critter => <Critter key={critter.id} critter={critter} />)}
			</section>
		</article>
	)
}

export { CritterList }
