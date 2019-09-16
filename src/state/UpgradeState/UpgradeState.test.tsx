import { UpgradeState } from './UpgradeState'

describe('UpgradeState unit tests', () => {
	let fixture: UpgradeState

	describe('initialize UpgradeState w/ value', () => {
		beforeEach(() => {
			fixture = new UpgradeState()
		})

		it('should set gathererLevel', () => {
			expect(fixture.gathererLevel).toBe(0)
		})

		it('should change gatherer upgrade cost', () => {
			expect(fixture.getGathererUpgradeCost()).toBe(100)
		})
	})

	describe('initialize UpgradeState w/ value', () => {
		beforeEach(() => {
			fixture = new UpgradeState(3)
		})

		it('should set gathererLevel', () => {
			expect(fixture.gathererLevel).toBe(3)
		})

		it('should change gatherer upgrade cost', () => {
			expect(fixture.getGathererUpgradeCost()).toBe(1600)
		})

		describe('invoke upgradeGatherers', () => {
			beforeEach(() => {
				fixture.upgradeGatherers()
			})

			it('should update gathererLevel and gatherer upgrade cost', () => {
				expect(fixture.gathererLevel).toBe(4)
				expect(fixture.getGathererUpgradeCost()).toBe(2500)
			})
		})
	})
})
