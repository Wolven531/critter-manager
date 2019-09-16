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

import { CritterState } from '../../state/CritterState/CritterState'

import { CritterList, ICritterListProps } from './CritterList'

configure({ adapter: new Adapter() })

describe('Shallow render CritterList', () => {
	let wrapperCritterListPage: ShallowWrapper<FC<ICritterListProps>>

	beforeEach(() => {
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
	let wrapperCritterListPage: ReactWrapper<FC<ICritterListProps>>

	beforeEach(() => {
		const state = new CritterState(0, fakeCritters)
		wrapperCritterListPage = mount(<CritterList critterState={state} />)
	})

	it('mounts and renders CritterList w/ no issues', () => {
		wrapperCritterListPage.update()

		wrapperCritterListPage.hasClass('critter-list')
		expect(wrapperCritterListPage.find('.display-container').exists()).toBe(true)

		expect(wrapperCritterListPage.find(CritterComponent)).toHaveLength(fakeCritters.length)
	})

	afterAll(() => {
		wrapperCritterListPage.unmount()
	})
})
