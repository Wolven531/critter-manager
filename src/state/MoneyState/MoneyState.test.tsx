import { MoneyState } from './MoneyState'

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
	})
})
