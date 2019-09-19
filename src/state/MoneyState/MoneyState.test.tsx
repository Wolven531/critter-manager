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
		})

		describe('invoke addMoney w/o argument', () => {
			beforeEach(() => {
				fixture.addMoney()
			})

			it('should increase money by default amount', () => {
				expect(fixture.money).toBe(364)
			})
		})
	})
})
