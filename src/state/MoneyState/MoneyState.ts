import {
	GATHERER_COST,
	GATHERER_INCOME
} from '../../constants'

interface IAutoSave {
	gatherers: number
	gathererLevel: number
	money: number
}

class MoneyState {
	// tslint:disable-next-line: variable-name
	private _currentMoney: number
	// tslint:disable-next-line: variable-name
	private _numGatherers: number

	constructor(initialMoney: number) {
		this._currentMoney = initialMoney
		this._numGatherers = 0
	}

	public get money(): number {
		return this._currentMoney
	}

	public get numGatherers(): number {
		return this._numGatherers
	}

	public addGatherer() {
		// TODO: research if multiple setSTATE_VAR() calls is bad practice
		this._currentMoney -= GATHERER_COST
		this._numGatherers += 1
	}

	public addMoney = (additionalFunds = 1) => {
		this._currentMoney += additionalFunds
	}

	public calculateGathererIncome(gathererLevel = 1): number {
		return this._numGatherers * GATHERER_INCOME * (gathererLevel > 0 ? gathererLevel : 1)
	}

	public collectFromGatherers(gathererLevel = 1) {
		this.addMoney(this.calculateGathererIncome(gathererLevel))
	}

	public loadFromStorage() {
		const storedAutoSaveStr = window.localStorage.getItem('react-hooks-todo.auto_save')
		if (!storedAutoSaveStr || storedAutoSaveStr.length < 1) {
			return
		}
		const autoSaveInfo: IAutoSave = JSON.parse(storedAutoSaveStr)
		this._numGatherers = autoSaveInfo.gatherers
		this._currentMoney = autoSaveInfo.money

		return autoSaveInfo
	}

	public resetProgress() {
		this._numGatherers = 0
		this._currentMoney = 0
	}

	public saveToStorage(gathererLevel: number) {
		const autoSaveInfo: IAutoSave = {
			gathererLevel,
			gatherers: this._numGatherers,
			money: this._currentMoney
		}
		window.localStorage.setItem('react-hooks-todo.auto_save', JSON.stringify(autoSaveInfo))
	}
}

export {
	MoneyState
}
