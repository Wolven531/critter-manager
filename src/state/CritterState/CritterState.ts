import { Critter } from '../../model/Critter'

class CritterState {
	// tslint:disable-next-line: variable-name
	private _critters: Critter[]
	// tslint:disable-next-line: variable-name
	private _currentMoney: number

	constructor(initialMoney: number, initialCritters: Critter[]) {
		this._critters = initialCritters
		this._currentMoney = initialMoney
	}

	public get critters(): Critter[] {
		return this._critters
	}

	public get currentMoney(): number {
		return this._currentMoney
	}

	public addCritter(newCritter: Critter) {
		this._critters = this._critters.concat(newCritter)
	}

	public clearCritters() {
		this._critters = []
	}

	public loadFromStorage() {
		const storedCritterStr = window.localStorage.getItem('react-hooks-todo.critters')
		if (!storedCritterStr || storedCritterStr.length < 1) {
			return
		}
		this._critters = JSON.parse(storedCritterStr)
	}

	public saveToLocalStorage() {
		window.localStorage.setItem('react-hooks-todo.critters', JSON.stringify(this._critters))
	}

	public async spawnCritter() {
		let nameResponse
		try {
			nameResponse = await fetch(`https://randomuser.me/api/`)
		} catch {
			// tslint:disable-next-line: no-console
			console.error('fetch not supported or randomuser.me not available...')
		}

		if (!nameResponse) {
			return
		}

		if (nameResponse.status !== 200) {
			// tslint:disable-next-line: no-console
			console.warn(`Failed to generate random name, status=${nameResponse.status} ${nameResponse.statusText}`)
			return
		}

		const nameData = await nameResponse.json()
		const { first }: { first: string } = nameData.results[0].name
		const firstLetter = first.charAt(0).toUpperCase()

		this.addCritter(
			new Critter(
				`${firstLetter}${first.substring(1)}`,
				1 + Math.round(Math.random() * (Critter.MAX_HITPOINTS - 1)),
				1 + Math.round(Math.random() * (Critter.MAX_ATTACK - 1)),
				1 + Math.round(Math.random() * (Critter.MAX_DEFENSE - 1))
			)
		)
	}
}

export { CritterState }
