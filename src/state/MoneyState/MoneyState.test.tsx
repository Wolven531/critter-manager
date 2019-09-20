import { MoneyState, GATHERER_COST } from './MoneyState'

describe('MoneyState unit tests', () => {
	let fixture: MoneyState

	describe('initialize MoneyState', () => {
		beforeEach(() => {
			fixture = new MoneyState(33 * 11)
		})

		it('should set money', () => {
			expect(fixture.money).toBe(363)
		})

		it('should set number of gatherers', () => {
			expect(fixture.numGatherers).toBe(0)
		})

		describe('invoke addGatherer', () => {
			beforeEach(() => {
				fixture.addGatherer()
			})

			it('should reduce currentMoney and increase number of gatherers', () => {
				expect(fixture.money).toBe(353)
				expect(fixture.numGatherers).toBe(1)
			})

			describe('invoke calculateGathererIncome w/o argument', () => {
				let resultingIncome: number
	
				beforeEach(() => {
					resultingIncome = fixture.calculateGathererIncome()
				})
	
				it('should calculate income using default gatherer level', () => {
					expect(resultingIncome).toBe(1)
				})
			})

			describe('invoke calculateGathererIncome w/ specified gatherer level', () => {
				let resultingIncome: number
	
				beforeEach(() => {
					resultingIncome = fixture.calculateGathererIncome(5)
				})
	
				it('should calculate income using specified gatherer level', () => {
					expect(resultingIncome).toBe(5)
				})
			})

			describe('invoke collectFromGatherers w/o arguments', () => {
				let spyAddMoney: jest.SpyInstance
				let spyCalculateGathererIncome: jest.SpyInstance

				beforeEach(() => {
					spyAddMoney = jest.spyOn(fixture, 'addMoney')
					spyCalculateGathererIncome = jest.spyOn(fixture, 'calculateGathererIncome')

					fixture.collectFromGatherers()
				})

				it('should increase money by calculated amount', () => {
					expect(spyCalculateGathererIncome).toHaveBeenCalledTimes(1)
					expect(spyCalculateGathererIncome).toHaveBeenLastCalledWith(1)

					expect(spyAddMoney).toHaveBeenCalledTimes(1)
					expect(spyAddMoney).toHaveBeenLastCalledWith(1)

					expect(fixture.money).toBe(354)
				})
			})

			describe('invoke collectFromGatherers w/ specific argument', () => {
				let spyAddMoney: jest.SpyInstance
				let spyCalculateGathererIncome: jest.SpyInstance

				beforeEach(() => {
					spyAddMoney = jest.spyOn(fixture, 'addMoney')
					spyCalculateGathererIncome = jest.spyOn(fixture, 'calculateGathererIncome')

					fixture.collectFromGatherers(5)
				})

				it('should increase money by calculated amount using specified gatherer level', () => {
					expect(spyCalculateGathererIncome).toHaveBeenCalledTimes(1)
					expect(spyCalculateGathererIncome).toHaveBeenLastCalledWith(5)

					expect(spyAddMoney).toHaveBeenCalledTimes(1)
					expect(spyAddMoney).toHaveBeenLastCalledWith(5)

					expect(fixture.money).toBe(358)
				})
			})

			describe('invoke resetProgress', () => {
				beforeEach(() => {
					fixture.resetProgress()
				})

				it('reset money and number of gatherers', () => {
					expect(fixture.money).toBe(0)
					expect(fixture.numGatherers).toBe(0)
				})
			})
		})

		describe('invoke addMoney w/o argument', () => {
			beforeEach(() => {
				fixture.addMoney()
			})

			it('should increase money by default amount', () => {
				expect(fixture.money).toBe(364)
			})
		})

		describe('invoke addMoney w/ specific amount', () => {
			beforeEach(() => {
				fixture.addMoney(16)
			})

			it('should increase money by specified amount', () => {
				expect(fixture.money).toBe(379)
			})
		})
	})
})
