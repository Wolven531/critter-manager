import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'
import { v1 } from 'uuid'

// models
import { Critter as CritterModel } from '../../model/Critter'

// local
import { Critter } from './Critter'

configure({ adapter: new Adapter() })

const fixtureCritter = new CritterModel('George', 100, 5, 3)
const fixtureCritterWithId = new CritterModel('George', 100, 5, 3, v1())

describe('Shallow render Critter component using Critter w/o ID', () => {
	let wrapperCritter: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritter = shallow(<Critter critter={fixtureCritter} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritter.update()

		expect(wrapperCritter.exists()).toBe(true)
		expect(wrapperCritter.hasClass('critter')).toBe(true)
		expect(wrapperCritter.hasClass('selected')).toBe(false)

		const critterTable = wrapperCritter.find('table')
		const nameRow = critterTable.find('tr').first()
		const hitpointsRow = critterTable.find('tr').at(1)
		const attackRow = critterTable.find('tr').at(2)
		const defenseRow = critterTable.find('tr').at(3)

		expect(nameRow.find('td').map(td => td.text())).toEqual(['Name', fixtureCritter.name])
		expect(hitpointsRow.find('td').map(td => td.text())).toEqual(['HP', String(fixtureCritter.hitpoints)])
		expect(attackRow.find('td').map(td => td.text())).toEqual(['Attack', String(fixtureCritter.attack)])
		expect(defenseRow.find('td').map(td => td.text())).toEqual(['Defense', String(fixtureCritter.defense)])
	})
})

describe('Shallow render Critter component using Critter w/ ID', () => {
	let wrapperCritter: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritter = shallow(<Critter critter={fixtureCritterWithId} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritter.update()

		expect(wrapperCritter.exists()).toBe(true)
		expect(wrapperCritter.hasClass('critter')).toBe(true)
		expect(wrapperCritter.hasClass('selected')).toBe(false)

		const critterTable = wrapperCritter.find('table')
		const nameRow = critterTable.find('tr').first()
		const hitpointsRow = critterTable.find('tr').at(1)
		const attackRow = critterTable.find('tr').at(2)
		const defenseRow = critterTable.find('tr').at(3)

		expect(nameRow.find('td').map(td => td.text())).toEqual(['Name', fixtureCritter.name])
		expect(hitpointsRow.find('td').map(td => td.text())).toEqual(['HP', String(fixtureCritter.hitpoints)])
		expect(attackRow.find('td').map(td => td.text())).toEqual(['Attack', String(fixtureCritter.attack)])
		expect(defenseRow.find('td').map(td => td.text())).toEqual(['Defense', String(fixtureCritter.defense)])
	})
})

describe('Mount and render Critter component', () => {
	let wrapperCritter: ReactWrapper<FC>

	beforeEach(() => {
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		const critter = <Critter critter={fixtureCritter}/>
		wrapperCritter = mount(critter)
	})

	afterEach(() => {
		wrapperCritter.unmount()
	})

	it('mounts and renders', () => {
		wrapperCritter.update()

		expect(wrapperCritter.exists()).toBe(true)
	})

	describe('clicking critter', () => {
		beforeEach(() => {
			wrapperCritter.update()

			const currentTarget = wrapperCritter.getElement()

			wrapperCritter.simulate('click', { currentTarget })
		})

		it('should toggle selected class on Critter', () => {
			wrapperCritter.update()

			expect(wrapperCritter.find('.critter').hasClass('selected')).toBe(true)
		})
	})
})
