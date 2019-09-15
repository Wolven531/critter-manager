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

		describe('altering window.localStorage', () => {
			let originalLocalStorage: Storage

			beforeEach(() => {
				originalLocalStorage = window.localStorage
			})

			afterEach(() => {
				(window as any).localStorage = originalLocalStorage
			})

			describe('loadFromStorage when localStorage is unavailable', () => {
				beforeEach(() => {
					(window as any).localStorage = undefined
					fixture.loadFromStorage()
				})

				it('should not affect critters', () => {
					expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
				})
			})

			describe('loadFromStorage when localStorage.getItem returns null', () => {
				beforeEach(() => {
					Object.defineProperty(window, 'localStorage', {
						value: {
							getItem: jest.fn(() => null)
						},
						writable: true
					})
					fixture.loadFromStorage()
				})

				it('should not affect critters', () => {
					expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
				})
			})

			describe('loadFromStorage when localStorage.getItem returns empty string', () => {
				beforeEach(() => {
					Object.defineProperty(window, 'localStorage', {
						value: {
							getItem: jest.fn(() => '')
						},
						writable: true
					})
					fixture.loadFromStorage()
				})

				it('should not affect critters', () => {
					expect(fixture.critters).toEqual([new CritterModel('critter 1', 10, 1, 0, 'id1')])
				})
			})

			describe('loadFromStorage when localStorage.getItem returns string of critters', () => {
				beforeEach(() => {
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

				it('should replace critters', () => {
					expect(fixture.critters).toEqual([new CritterModel('some critter', 100, 20, 12, 'someId')])
				})
			})
		})

		describe('altering window.fetch', () => {
			let originalFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>

			beforeEach(() => {
				originalFetch = window.fetch
			})

			afterEach(() => {
				window.fetch = originalFetch
			})

			// tslint:disable: no-console
			describe('when fetch API is not available', () => {
				let mockConsoleError: jest.Mock
				let originalConsoleError: (message?: any, ...optionalParams: any[]) => void

				beforeEach(() => {
					(window as any).fetch = undefined
					originalConsoleError = console.error
					mockConsoleError = jest.fn()
					console.error = mockConsoleError

					fixture.spawnCritter()
				})

				afterEach(() => {
					console.error = originalConsoleError
				})

				it('should invoke console.error', () => {
					expect(mockConsoleError).toHaveBeenCalledTimes(1)
					expect(mockConsoleError).toHaveBeenLastCalledWith('fetch not supported or randomuser.me not available...')
				})
			})
			// tslint:enable: no-console

			// tslint:disable: no-console
			describe('when fetch returns non 200 status', () => {
				let mockConsoleWarn: jest.Mock
				let originalConsoleWarn: (message?: any, ...optionalParams: any[]) => void

				beforeEach(() => {
					(window as any).fetch = jest.fn(() => {
						return new Response(undefined, { status: 500 })
					})
					originalConsoleWarn = console.warn
					mockConsoleWarn = jest.fn()
					console.warn = mockConsoleWarn

					fixture.spawnCritter()
				})

				afterEach(() => {
					console.warn = originalConsoleWarn
				})

				it('should invoke console.warn', () => {
					expect(mockConsoleWarn).toHaveBeenCalledTimes(1)
					expect(mockConsoleWarn).toHaveBeenLastCalledWith('Failed to generate random name, status=500 OK')
				})
			})
			// tslint:enable: no-console

			describe('when fetch returns proper data', () => {
				const fakeResponse = { results: [ { name: { first: 'oliver' } } ] }
				let spyAddCritter: jest.SpyInstance

				beforeEach(() => {
					(window as any).fetch = jest.fn(() => {
						return new Response(JSON.stringify(fakeResponse), { status: 200 })
					})
					spyAddCritter = jest.spyOn(fixture, 'addCritter')

					fixture.spawnCritter()
				})

				it('should invoke addCritter w/ capitalized first name', () => {
					expect(spyAddCritter).toHaveBeenCalledTimes(1)
					const passedCritterParam = spyAddCritter.mock.calls[0][0]
					expect(passedCritterParam).toMatchObject({ name: 'Oliver' })
				})
			})
		})
	})
})
