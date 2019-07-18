import React, { FC } from 'react'

import { COMBAT_COST } from '../../service/combatService'

import './CritterListControls.scss'

interface ICritterListControlsProps {
	canStartCombat: boolean
	clearCritters: () => void
	saveToLocalStorage: () => void
	shouldShowCombat: boolean
	spawnCritter: () => void
	startCombat: () => void
}

const CritterListControls: FC<ICritterListControlsProps> = ({
	canStartCombat,
	clearCritters,
	saveToLocalStorage,
	shouldShowCombat,
	spawnCritter,
	startCombat }) => {
	return (
		<section className="critter-list-controls">
			{shouldShowCombat
				? <button className="combat" onClick={() => { if (canStartCombat) {startCombat()} }} disabled={!canStartCombat}>
					Start Combat ({COMBAT_COST})
				</button>
				: null}
			<button className="create" onClick={() => { spawnCritter() }}>
				Spawn Critter
			</button>
			<button className="update" onClick={() => { saveToLocalStorage() }}>
				Save Critters (local)
			</button>
			<button className="delete" onClick={() => { clearCritters() }}>
				Clear Critters
			</button>
		</section>
	)
}

export { CritterListControls }
