import { v1 } from 'uuid'

class Critter {
	public static MAX_ATTACK = 5
	public static MAX_DEFENSE = 5
	public static MAX_HITPOINTS = 10

	constructor(
		public name: string,
		public hitpoints: number,
		public attack: number,
		public defense: number,
		public id?: string) {

		if (!id) {
			this.id = v1()
			// console.info(`[ctor | Critter] No ID, generated="${id}"...`)
		}
	}
}

export { Critter }
