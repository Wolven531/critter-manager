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
})
