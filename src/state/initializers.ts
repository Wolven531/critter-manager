import { useState } from 'react'

import {
	STORAGEKEY_ACHIEVEMENT_LEVEL_GATHER,
	STORAGEKEY_ACHIEVEMENT_LEVEL_MONEY,
	STORAGEKEY_GATHERCOUNT,
	STORAGEKEY_GATHERINCOMELEVEL,
	STORAGEKEY_GATHERSPEEDLEVEL,
	STORAGEKEY_MONEY
} from '../constants'

const initAchievements = (achievementType: string): any[] => {
	let achieveStr: string | null = null

	switch(achievementType) {
		case 'gather':
			achieveStr = window.localStorage.getItem(STORAGEKEY_ACHIEVEMENT_LEVEL_GATHER)
			break
		case 'money':
			achieveStr = window.localStorage.getItem(STORAGEKEY_ACHIEVEMENT_LEVEL_MONEY)
			break
		default:
			break
	}

	if (!achieveStr || achieveStr.length < 1) {
		// 	return 0
		return useState(0)
	}
	// return parseInt(achieveStr, 10)
	return useState(parseInt(achieveStr, 10))
}

const initGatherCount = (): number => {
	const gathererStr = window.localStorage.getItem(STORAGEKEY_GATHERCOUNT)
	if (!gathererStr || gathererStr.length < 1) {
		return 0
	}
	return parseInt(gathererStr, 10)
}

const initGatherIncomeLevel = (): number => {
	const gatherIncomeLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERINCOMELEVEL)
	if (!gatherIncomeLevelStr || gatherIncomeLevelStr.length < 1) {
		return 0
	}
	return parseInt(gatherIncomeLevelStr, 10)
}

const initGatherSpeedLevel = (): number => {
	const gatherSpeedLevelStr = window.localStorage.getItem(STORAGEKEY_GATHERSPEEDLEVEL)
	if (!gatherSpeedLevelStr || gatherSpeedLevelStr.length < 1) {
		return 1
	}
	return parseInt(gatherSpeedLevelStr, 10)
}

const initMoney = (): number => {
	const moneyStr = window.localStorage.getItem(STORAGEKEY_MONEY)
	if (!moneyStr || moneyStr.length < 1) {
		return 0
	}
	return parseInt(moneyStr, 10)
}

export {
	initAchievements,
	initGatherCount,
	initGatherIncomeLevel,
	initGatherSpeedLevel,
	initMoney
}
