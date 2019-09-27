import {
	STORAGEKEY_MONEY,
	STORAGEKEY_GATHERERS,
	STORAGEKEY_GATHERROILEVEL
} from '../constants'

const initGatherROILevel = (): number => {
	const gatherROILevelStr = window.localStorage.getItem(STORAGEKEY_GATHERROILEVEL)
	if (!gatherROILevelStr || gatherROILevelStr.length < 1) {
		return 0
	}
	return parseInt(gatherROILevelStr, 10)
}

const initMoney = (): number => {
	const moneyStr = window.localStorage.getItem(STORAGEKEY_MONEY)
	if (!moneyStr || moneyStr.length < 1) {
		return 0
	}
	return parseInt(moneyStr, 10)
}

const initNumGatherers = (): number => {
	const gathererStr = window.localStorage.getItem(STORAGEKEY_GATHERERS)
	if (!gathererStr || gathererStr.length < 1) {
		return 0
	}
	return parseInt(gathererStr, 10)
}

export {
	initGatherROILevel,
	initMoney,
	initNumGatherers
}
