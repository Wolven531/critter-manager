import {
	STORAGEKEY_MONEY,
	STORAGEKEY_GATHERERS,
	STORAGEKEY_GATHERLEVEL
} from '../constants'

class AutoSave {
	public static saveToLocal(gatherLevel: number, money: number, numGatherers: number) {
		window.localStorage.setItem(STORAGEKEY_GATHERLEVEL, JSON.stringify(gatherLevel))
		window.localStorage.setItem(STORAGEKEY_MONEY, JSON.stringify(money))
		window.localStorage.setItem(STORAGEKEY_GATHERERS, JSON.stringify(numGatherers))
	}
}

export { AutoSave }
