import { Combatant } from './Combatant'
import { Weapon } from './Weapon'

class Turn {
	constructor(
		public fighter1: Combatant,
		public fighter2: Combatant,
		public weapon1: Weapon,
		public weapon2: Weapon) { }
}

export { Turn }
