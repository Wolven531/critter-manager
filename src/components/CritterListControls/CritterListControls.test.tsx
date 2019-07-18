import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

// models

// local
import { CritterListControls } from './CritterListControls'

configure({ adapter: new Adapter() })

describe('Shallow render CritterListControls component', () => {
	let mockClearCritters: jest.Mock
	let mockSaveToLocalStorage: jest.Mock
	let mockSpawnCritter: jest.Mock
	let wrapperCritterListControls: ShallowWrapper<FC>

	beforeEach(() => {
		mockClearCritters = jest.fn()
		mockSaveToLocalStorage = jest.fn()
		mockSpawnCritter = jest.fn()
		wrapperCritterListControls = shallow(<CritterListControls
			canStartCombat={false}
			clearCritters={mockClearCritters}
			saveToLocalStorage={mockSaveToLocalStorage}
			shouldShowCombat={false}
			spawnCritter={mockSpawnCritter}
			startCombat={() => { return }} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritterListControls.update()

		const combatButton = wrapperCritterListControls.find('button.combat')

		expect(combatButton.exists()).toBe(false)
		expect(wrapperCritterListControls.exists()).toBe(true)
		expect(wrapperCritterListControls.hasClass('critter-list-controls')).toBe(true)
	})

	describe('clicking spawn critter', () => {
		beforeEach(() => {
			wrapperCritterListControls.update()

			const spawnButton = wrapperCritterListControls.find('button.create')
			expect(spawnButton.text()).toBe('Spawn Critter')

			spawnButton.simulate('click')
		})

		it('should invoke spawnCritter()', () => {
			expect(mockSpawnCritter).toHaveBeenCalledTimes(1)
		})
	})

	describe('clicking spawn critter', () => {
		beforeEach(() => {
			wrapperCritterListControls.update()

			const saveButton = wrapperCritterListControls.find('button.update')
			expect(saveButton.text()).toBe('Save Critters (local)')

			saveButton.simulate('click')
		})

		it('should invoke spawnCritter()', () => {
			expect(mockSaveToLocalStorage).toHaveBeenCalledTimes(1)
		})
	})

	describe('clicking clear critters', () => {
		beforeEach(() => {
			wrapperCritterListControls.update()

			const clearButton = wrapperCritterListControls.find('button.delete')
			expect(clearButton.text()).toBe('Clear Critters')

			clearButton.simulate('click')
		})

		it('should invoke clearCritters()', () => {
			expect(mockClearCritters).toHaveBeenCalledTimes(1)
		})
	})
})

describe('Shallow render CritterListControls component w/ combat shown but disabled', () => {
	let mockStartCombat: jest.Mock
	let wrapperCritterListControls: ShallowWrapper<FC>

	beforeEach(() => {
		mockStartCombat = jest.fn()
		wrapperCritterListControls = shallow(<CritterListControls
			canStartCombat={false}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={true}
			spawnCritter={() => { return }}
			startCombat={mockStartCombat} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritterListControls.update()

		const combatButton = wrapperCritterListControls.find('button.combat')

		expect(combatButton.exists()).toBe(true)
		expect(combatButton.text()).toBe('Start Combat (100)')
		expect(combatButton.props().disabled).toBe(true)
	})

	describe('clicking disabled combat button', () => {
		beforeEach(() => {
			wrapperCritterListControls.update()

			const combatButton = wrapperCritterListControls.find('button.combat')

			combatButton.simulate('click')
		})

		it('should NOT call startCombat', () => {
			expect(mockStartCombat).not.toHaveBeenCalled()
		})
	})
})

describe('Shallow render CritterListControls component w/ combat shown and enabled', () => {
	let wrapperCritterListControls: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritterListControls = shallow(<CritterListControls
			canStartCombat={true}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={true}
			spawnCritter={() => { return }}
			startCombat={() => { return }} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritterListControls.update()

		const combatButton = wrapperCritterListControls.find('button.combat')

		expect(combatButton.exists()).toBe(true)
		expect(combatButton.text()).toBe('Start Combat (100)')
		expect(combatButton.props().disabled).toBe(false)
	})
})

describe('Mount and render CritterListControls component w/ combat shown and enabled', () => {
	let mockStartCombat: jest.Mock
	let wrapperCritterListControls: ReactWrapper<FC>

	beforeEach(() => {
		mockStartCombat = jest.fn()
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		const critterListControls = <CritterListControls
			canStartCombat={true}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={true}
			spawnCritter={() => { return }}
			startCombat={mockStartCombat} />
		wrapperCritterListControls = mount(critterListControls)
	})

	afterEach(() => {
		wrapperCritterListControls.unmount()
	})

	it('mounts and renders', () => {
		wrapperCritterListControls.update()

		expect(wrapperCritterListControls.exists()).toBe(true)
	})

	describe('clicking combat button', () => {
		beforeEach(() => {
			wrapperCritterListControls.update()

			const combatButton = wrapperCritterListControls.find('button.combat')

			combatButton.simulate('click')
		})

		it('should invoke startCombat()', () => {
			expect(mockStartCombat).toHaveBeenCalledTimes(1)
		})
	})
})
