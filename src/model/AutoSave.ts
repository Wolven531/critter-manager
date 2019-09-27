import {
	STORAGEKEY_MONEY,
	STORAGEKEY_GATHERERS,
	STORAGEKEY_GATHERROILEVEL,
	STORAGEKEY_GATHERSPEEDLEVEL
} from '../constants'

class AutoSave {
	public static saveToLocal(gatherROILevel: number, gatherSpeedLevel: number, money: number, numGatherers: number) {
		window.localStorage.setItem(STORAGEKEY_GATHERROILEVEL, JSON.stringify(gatherROILevel))
		window.localStorage.setItem(STORAGEKEY_GATHERSPEEDLEVEL, JSON.stringify(gatherSpeedLevel))
		window.localStorage.setItem(STORAGEKEY_MONEY, JSON.stringify(money))
		window.localStorage.setItem(STORAGEKEY_GATHERERS, JSON.stringify(numGatherers))
	}
}

export { AutoSave }
