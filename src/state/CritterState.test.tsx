import { Critter as CritterModel } from '../model/Critter'

import { CritterState } from './CritterState'

describe('CritterState unit tests', () => {
	let fixture: CritterState

	describe('initialize CritterState', () => {
		beforeEach(() => {
			fixture = new CritterState(10 * 50, [new CritterModel('critter 1', 10, 1, 0, 'id1')])
		})

		it('should set currentMoney', () => {
			expect(fixture.currentMoney).toBe(500)
		})

		it('should set critters', () => {
			expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
		})

		describe('invoke addCritter', () => {
			beforeEach(() => {
				fixture.addCritter(new CritterModel('critter 2', 5, 5, 2, 'id2'))
			})

			it('should update critters', () => {
				expect(fixture.critters).toEqual([
					new CritterModel('critter 1', 10, 1, 0, 'id1'),
					new CritterModel('critter 2', 5, 5, 2, 'id2')
				])
			})
		})

		describe('invoke clearCritters', () => {
			beforeEach(() => {
				fixture.clearCritters()
			})

			it('should empty critters', () => {
				expect(fixture.critters).toEqual([])
			})
		})

		describe('loadFromStorage when localStorage is unavailable', () => {
			let originalLocalStorage: Storage

			beforeEach(() => {
				originalLocalStorage = window.localStorage; // NOTE: necessary semi

				(window as any).localStorage = undefined
				fixture.loadFromStorage()
			})

			afterEach(() => {
				(window as any).localStorage = originalLocalStorage
			})

			it('should not affect critters', () => {
				expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
			})
		})

		describe('loadFromStorage when localStorage.getItem returns null', () => {
			let originalLocalStorage: Storage

			beforeEach(() => {
				originalLocalStorage = window.localStorage

				Object.defineProperty(window, 'localStorage', {
					value: {
						getItem: jest.fn(() => null)
					},
					writable: true
				})
				fixture.loadFromStorage()
			})

			afterEach(() => {
				(window as any).localStorage = originalLocalStorage
			})

			it('should not affect critters', () => {
				expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
			})
		})

		describe('loadFromStorage when localStorage.getItem returns empty string', () => {
			let originalLocalStorage: Storage

			beforeEach(() => {
				originalLocalStorage = window.localStorage

				Object.defineProperty(window, 'localStorage', {
					value: {
						getItem: jest.fn(() => '')
					},
					writable: true
				})
				fixture.loadFromStorage()
			})

			afterEach(() => {
				(window as any).localStorage = originalLocalStorage
			})

			it('should not affect critters', () => {
				expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
			})
		})

		describe('loadFromStorage when localStorage.getItem returns string of critters', () => {
			let originalLocalStorage: Storage

			beforeEach(() => {
				originalLocalStorage = window.localStorage

				Object.defineProperty(window, 'localStorage', {
					value: {
						getItem: jest.fn(() => {
							return JSON.stringify([new CritterModel('some critter', 100, 20, 12, 'someId')])
						})
					},
					writable: true
				})
				fixture.loadFromStorage()
			})

			afterEach(() => {
				(window as any).localStorage = originalLocalStorage
			})

			it('should replace critters', () => {
				expect(fixture.critters).toEqual([new CritterModel('some critter', 100, 20, 12, 'someId')])
			})
		})
	})
})
