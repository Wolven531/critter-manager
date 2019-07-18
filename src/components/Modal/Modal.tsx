import React, { FC, MouseEvent } from 'react'

import './Modal.scss'

interface IModalProps {
	handleModalDialogClose: () => void
	isLoading?: boolean
	showCloseButton?: boolean
}

const Modal: FC<IModalProps> = ({
	handleModalDialogClose,
	children,
	showCloseButton = true,
	isLoading = false
}) => {
	const handleModalClick = (evt: MouseEvent) => {
		// TODO: figure out how to alert the user about the modal
		// const { currentTarget, target, preventDefault } = evt
		// preventDefault()
		// alert(`Must close the modal... ${(target as Element).classList}`)
	}

	const optionalCloseButton = showCloseButton
		? (<button onClick={handleModalDialogClose} className="close">X</button>)
		: null

	return (
		<div onClick={handleModalClick} className="modal-container">
			<div className="modal">
				{isLoading
					? <div>Loading...</div>
					: <div>{optionalCloseButton}{children}</div>}
			</div>
		</div>
	)
}

export { Modal }
