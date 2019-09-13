import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { Critter as CritterComponent } from '../../components/Critter/Critter'

import { Critter as CritterModel } from '../../model/Critter'

import { CritterState } from '../../state/CritterState'

import { CritterList, ICritterListProps } from './CritterList'

configure({ adapter: new Adapter() })

describe('Shallow render CritterList', () => {
	let wrapperCritterListPage: ShallowWrapper<FC<ICritterListProps>>

	beforeEach(() => {
		// wrapperCritterListPage = shallow(<CritterList currentMoney={0} />)
		wrapperCritterListPage = shallow(<CritterList critterState={null as unknown as CritterState} />)
		wrapperCritterListPage.hasClass('critter-list')

		const displayContainer = wrapperCritterListPage.find('.display-container')
		expect(displayContainer.exists()).toBe(true)
		expect(displayContainer.children()).toHaveLength(0)
	})

	it('shallow renders CritterList w/ no issues', () => {
		wrapperCritterListPage.update()

		expect(wrapperCritterListPage.exists()).toBe(true)
	})
})

describe('Mount and render CritterList', () => {
	const fakeCritters = [new CritterModel('critter 1', 10, 2, 1)]
	let mockLoadFromStorage: jest.Mock
	// let mockedUseCritterState: () => { critters: CritterModel[], loadFromStorage: () => void }
	let mockedUseCritterState: jest.Mock
	let wrapperCritterListPage: ReactWrapper<FC<ICritterListProps>>

	beforeEach(() => {
		jest.resetModules()
		mockLoadFromStorage = jest.fn()
		// mockedUseCritterState = jest.fn(() => {
		// 	return {
		// 		critters: fakeCritters,
		// 		loadFromStorage: mockLoadFromStorage
		// 	}
		// })
		//// mockedUseCritterState = jest.fn(() => {
		//// 	return {
		//// 		critters: fakeCritters,
		//// 		loadFromStorage: mockLoadFromStorage
		//// 	}
		//// })
		// mockedUseCritterState = (jest.genMockFromModule('../../state/useCritterState') as any).useCritterState
		// mockedUseCritterState = jest.genMockFromModule('../../state/useCritterState')
		// mockedUseCritterState.mockImplementation(jest.fn())
		// jest.mock('../../state/useCritterState', () => {
		// 	return (initialValue: Critter[]) => {
		// 		return {
		// 			loadFromStorage: mockLoadFromStorage
		// 		}
		// 	}
		// })
		// jest.mock('../../state/useCritterState')
		// useCritterState = jest.fn()
		// jest.mock('../../state/useCritterState', () => {
		// 	return {
		// 		useCritterState: jest.fn(() => {
		// 			// NOTE: need to require again to have access here
		// 			const CritterModel = require('../../model/Critter').Critter

		// 			return {
		// 				clearCritters: jest.fn(),
		// 				// critters: fakeCritters, // NOTE: invalid variable access?
		// 				critters: [new CritterModel('critter 1', 10, 2, 1)],
		// 				loadFromStorage: jest.fn(),
		// 				saveToLocalStorage: jest.fn(),
		// 				spawnCritter: jest.fn()
		// 			}
		// 		})
		// 	}
		// })
		// const CritterListWithMocks = require('./CritterList').CritterList;
		// wrapperCritterListPage = mount(<CritterListWithMocks currentMoney={0} />)
		const state = new CritterState(0, fakeCritters)
		wrapperCritterListPage = mount(<CritterList critterState={state} />)
	})
	
	it('mounts and renders CritterList w/ no issues', () => {
		wrapperCritterListPage.update()
		
		wrapperCritterListPage.hasClass('critter-list')
		expect(wrapperCritterListPage.find('.display-container').exists()).toBe(true)

		expect(wrapperCritterListPage.find(CritterComponent)).toHaveLength(fakeCritters.length)
		// expect(jest.isMockFunction(useCritterState)).toBe(true)
		// expect(mockLoadFromStorage).toHaveBeenCalledTimes(1)
		// expect(mockedUseCritterState).toHaveBeenCalledTimes(1)
		// expect(mockedUseCritterState).toHaveBeenLastCalledWith([])
	})

	afterAll(() => {
		wrapperCritterListPage.unmount()
	})
})
