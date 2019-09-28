import {
	STORAGEKEY_GATHERCOUNT,
	STORAGEKEY_GATHERINCOMELEVEL,
	STORAGEKEY_GATHERSPEEDLEVEL,
	STORAGEKEY_MONEY
} from '../constants'

class AutoSave {
	public static saveToLocal(gatherROILevel: number, gatherSpeedLevel: number, money: number, numGatherers: number) {
		window.localStorage.setItem(STORAGEKEY_GATHERCOUNT, JSON.stringify(numGatherers))
		window.localStorage.setItem(STORAGEKEY_GATHERINCOMELEVEL, JSON.stringify(gatherROILevel))
		window.localStorage.setItem(STORAGEKEY_GATHERSPEEDLEVEL, JSON.stringify(gatherSpeedLevel))
		window.localStorage.setItem(STORAGEKEY_MONEY, JSON.stringify(money))
	}
}

export { AutoSave }
