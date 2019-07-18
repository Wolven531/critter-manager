import { useState } from 'react'

const GATHERER_COST = 10
const GATHERER_INCOME = 1

export interface IMoneyState {
	addGatherer: () => void
	addMoney: (additionalFunds?: number) => void
	calculateGathererIncome: (gathererLevel?: number) => number
	collectFromGatherers: (gathererLevel?: number) => void
	gatherers: number
	loadFromStorage: () => IAutoSave | undefined
	resetProgress: () => void
	saveToStorage: (gathererLevel: number) => void
	money: number
}

interface IAutoSave {
	gatherers: number
	gathererLevel: number
	money: number
}

const useMoneyState = (initialValue: number): IMoneyState => {
	const [money, setMoney] = useState(initialValue)
	const [gatherers, setGatherers] = useState(0)

	const addMoney = (additionalFunds: number = 1) => {
		setMoney(money => money + additionalFunds)
	}

	const calculateGathererIncome = (gathererLevel = 1): number => gatherers * GATHERER_INCOME * (gathererLevel + 1)

	return {
		gatherers,
		money,
		addGatherer: () => {
			// TODO: research if multiple setSTATE_VAR() calls is bad practice
			setMoney(money => money - GATHERER_COST)
			setGatherers(gatherers => gatherers + 1)
		},
		addMoney,
		calculateGathererIncome,
		collectFromGatherers: (gathererLevel = 1) => {
			addMoney(calculateGathererIncome(gathererLevel))
		},
		loadFromStorage: (): IAutoSave | undefined => {
			if (!window.localStorage) {
				console.warn('[loadFromStorage | useMoneyState] localStorage is NOT available! failed to load')
				return
			}
			const storedAutoSaveStr = window.localStorage.getItem('react-hooks-todo.auto_save')
			if (!storedAutoSaveStr || storedAutoSaveStr.length < 1) {
				return
			}
			const autoSaveInfo: IAutoSave = JSON.parse(storedAutoSaveStr)
			setGatherers(autoSaveInfo.gatherers)
			setMoney(autoSaveInfo.money)

			return autoSaveInfo
		},
		resetProgress: () => {
			setGatherers(0)
			setMoney(0)
		},
		saveToStorage: (gathererLevel: number) => {
			if (!window.localStorage) {
				alert('local storage not available, unable to save 😢')
				return
			}
			// console.info('localStorage is available! saving money...')
			// window.localStorage.setItem('react-hooks-todo.money', String(money))
			const autoSaveInfo: IAutoSave = {
				gathererLevel,
				gatherers,
				money
			}
			window.localStorage.setItem('react-hooks-todo.auto_save', JSON.stringify(autoSaveInfo))
		}
	}
}

export {
	useMoneyState,
	GATHERER_COST
}
