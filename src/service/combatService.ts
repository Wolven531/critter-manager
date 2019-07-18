import { Combatant } from '../model/Combatant'
import { Critter } from '../model/Critter'
import { Turn } from '../model/Turn'
import { Weapon } from '../model/Weapon'

const isOver = (fighter1: Combatant, fighter2: Combatant) => fighter1.currentHitpoints <= 0 || fighter2.currentHitpoints <= 0

const getDamageForAttack = (fighter: Combatant, weapon: Weapon) => {
	// TODO: ensure chance is taken into account
	return fighter.attack + weapon.minimumDamage
}

const COMBAT_COST = 100

const combatService = () => {
	const fight = (
		fighter1: Critter,
		fighter2: Critter,
		weapon1: Weapon,
		weapon2: Weapon): Turn[] => {
			console.info(`[ fight | combatService] Starting...`)
			const turns: Turn[] = []
			const c1 = new Combatant(fighter1)
			const c2 = new Combatant(fighter2)

			while (!isOver(c1, c2)) {
				const t = new Turn(c1, c2, weapon1, weapon2)
				console.info(`[ fight | combatService] Creating turn ${JSON.stringify(t)}...`)
				const damageAgainstC2 = getDamageForAttack(c1, weapon1)
				const damageAgainstC1 = getDamageForAttack(c2, weapon2)
				// NOTE: primary attack for turn
				console.info(`[ fight | combatService] ${c1.name} attacks ${c2.name} with ${weapon1.name}...`)
				c2.currentHitpoints -= damageAgainstC2
				// NOTE: potential counterattack?
				// TODO: fix c2 attacking c1
				console.info(`[ fight | combatService] ${c2.name} attacks ${c1.name} with ${weapon2.name}...`)
				c1.currentHitpoints -= damageAgainstC1
				turns.push(t)
			}

		return turns
	}

	return {
		fight
	}
}

export {
	combatService,
	COMBAT_COST
}
