import {
	Dispatch,
	SetStateAction,
	useState
} from 'react'

class UpgradeStore {
	public gathererLevel: number

	private setGathererLevel: Dispatch<SetStateAction<number>>

	constructor(public initialLevel = 0) {
		const [ _gathererLevel, setGathererLevel ] = useState(initialLevel)
		this.gathererLevel = _gathererLevel
		this.setGathererLevel = setGathererLevel
	}

	public getGathererUpgradeCost(): number {
		return Math.pow(this.gathererLevel + 1, 2) * 100
	}

	public upgradeGatherers(): void {
		this.setGathererLevel(gathererLevel => gathererLevel + 1)
	}
}

export { UpgradeStore }
