import {
	STORAGEKEY_MONEY,
	STORAGEKEY_GATHERERS,
	STORAGEKEY_GATHERLEVEL
} from '../constants'

const initGatherLevel = (): number => {
	const gatherLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERLEVEL)
	if (!gatherLevelStr || gatherLevelStr.length < 1) {
		return 0
	}
	return parseInt(gatherLevelStr, 10)
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
	initGatherLevel,
	initMoney,
	initNumGatherers
}
