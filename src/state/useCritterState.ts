import { useState } from 'react'

import { combatService } from '../service/combatService'

import { Critter } from '../model/Critter'

const useCritterState = (initialValue: Critter[]) => {
	const [critters, setCritters] = useState(initialValue)
	const service = combatService()
	const addCritter = (newCritter: Critter) => {
		setCritters(critters.concat(newCritter))
	}
	const fight = () => {
		// service.fight()
	}

	return {
		critters,
		addCritter,
		clearCritters: () => {
			setCritters([])
		},
		// deleteCritter: (critterId: string) => {
		// 	setCritters(critters.filter(critter => critter.id !== critterId))
		// },
		loadFromStorage: () => {
			if (window.localStorage) {
				// console.info('localStorage is available! loading critter...')
				const storedCritterStr = window.localStorage.getItem('react-hooks-todo.critters')
				if (storedCritterStr && storedCritterStr.length) {
					setCritters(JSON.parse(storedCritterStr))
				}
			}
		},
		saveToLocalStorage: () => {
			if (!window.localStorage) {
				alert('local storage not available, unable to save 😢')
				return
			}
			// console.info('localStorage is available! saving critters...')
			window.localStorage.setItem('react-hooks-todo.critters', JSON.stringify(critters))
		},
		spawnCritter: async () => {
			const nameResponse = await fetch(`https://randomuser.me/api/`)

			if (nameResponse.status !== 200) {
				console.warn(`Failed to generate random name, status=${nameResponse.status} ${nameResponse.statusText}`)
				return
			}

			const nameData = await nameResponse.json()
			// const { first, last } = nameData.results[0].name
			const { first }: { first: string } = nameData.results[0].name
			const firstLetter = first.charAt(0).toUpperCase()

			addCritter(
				new Critter(
					`${firstLetter}${first.substring(1)}`,
					1 + Math.round(Math.random() * (Critter.MAX_HITPOINTS - 1)),
					1 + Math.round(Math.random() * (Critter.MAX_ATTACK - 1)),
					1 + Math.round(Math.random() * (Critter.MAX_DEFENSE - 1))
				)
			)
		}
	}
}

export { useCritterState }
