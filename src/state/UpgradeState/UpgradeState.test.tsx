import { UpgradeState } from './UpgradeState'

describe('UpgradeState unit tests', () => {
	let fixture: UpgradeState

	describe('initialize UpgradeState', () => {
		beforeEach(() => {
			fixture = new UpgradeState(3)
		})

		it('should set gathererLevel', () => {
			expect(fixture.gathererLevel).toBe(3)
		})

		it('should update gathererLevel', () => {
			expect(fixture.getGathererUpgradeCost()).toBe(1600)
		})
	})
})
