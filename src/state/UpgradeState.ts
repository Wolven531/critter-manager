class UpgradeState {
	// tslint:disable-next-line: variable-name
	private _gathererLevel: number

	constructor(initialLevel = 0) {
		this._gathererLevel = initialLevel
	}

	public get gathererLevel(): number {
		return this._gathererLevel
	}

	public getGathererUpgradeCost(): number {
		return Math.pow(this._gathererLevel + 1, 2) * 100
	}

	public upgradeGatherers() {
		this._gathererLevel += 1
	}
}

export { UpgradeState }
