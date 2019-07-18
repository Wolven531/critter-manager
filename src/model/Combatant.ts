import { Critter } from '../model/Critter'

class Combatant extends Critter {
	constructor(
		critter: Critter,
		public currentHitpoints: number = -1
	) {
		super(
			critter.name,
			critter.hitpoints,
			critter.attack,
			critter.defense,
			critter.id)

		if (currentHitpoints === -1) {
			this.currentHitpoints = critter.hitpoints
		}
	}
}

export { Combatant }
