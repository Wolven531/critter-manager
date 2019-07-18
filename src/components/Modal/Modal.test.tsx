import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

// local
import { Modal } from './Modal'

configure({ adapter: new Adapter() })

describe('Shallow render Modal component using defaults', () => {
	let mockHandleModalDialogClose: jest.Mock
	let wrapperModal: ShallowWrapper<FC>

	beforeEach(() => {
		mockHandleModalDialogClose = jest.fn()
		wrapperModal = shallow(<Modal handleModalDialogClose={mockHandleModalDialogClose} />)
	})

	it('shallow renders', () => {
		wrapperModal.update()

		expect(wrapperModal.exists()).toBe(true)
		expect(wrapperModal.hasClass('modal-container')).toBe(true)
	})

	describe('click Modal (not on close button)', () => {
		beforeEach(() => {
			wrapperModal.update()

			wrapperModal.simulate('click')
		})

		it('remains visible', () => {
			wrapperModal.update()

			expect(wrapperModal.exists()).toBe(true)
		})
	})

	describe('click close button', () => {
		beforeEach(() => {
			wrapperModal.update()

			const closeButton = wrapperModal.find('.close')

			expect(closeButton.text()).toBe('X')

			closeButton.simulate('click')
		})

		it('invokes handleModalDialogClose', () => {
			expect(mockHandleModalDialogClose).toHaveBeenCalledTimes(1)
		})
	})
})

describe('Shallow render Modal component w/o close button, that is loading', () => {
	let mockHandleModalDialogClose: jest.Mock
	let wrapperModal: ShallowWrapper<FC>

	beforeEach(() => {
		mockHandleModalDialogClose = jest.fn()
		wrapperModal = shallow(<Modal
			isLoading={true}
			showCloseButton={false}
			handleModalDialogClose={mockHandleModalDialogClose} />)
	})

	it('shallow renders w/ loading text', () => {
		wrapperModal.update()

		expect(wrapperModal.exists()).toBe(true)

		const closeButton = wrapperModal.find('.close')
		expect(closeButton.exists()).toBe(false)

		expect(wrapperModal.text()).toBe('Loading...')
	})
})
