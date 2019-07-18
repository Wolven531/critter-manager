import React, { FC, useState } from 'react'

import { Critter as CritterModel } from '../../model/Critter'

import './Critter.scss'

interface ICritterProps {
	critter: CritterModel
}

const Critter: FC<ICritterProps> = ({ critter }) => {
	const [isSelected, setIsSelected] = useState(false)
	const classes = ['critter']

	const toggleSelectedOnClick = (evt: React.MouseEvent) => {
		setIsSelected(!isSelected)
	}

	if (isSelected) {
		classes.push('selected')
	}

	return (
		<section className={classes.join(' ')} onClick={toggleSelectedOnClick}>
			<table>
				{/*
				<thead>
					<tr>
						<td colSpan={2}>{critter.id}</td>
					</tr>
				</thead>
				*/}
				<tbody>
					<tr>
						<td>Name</td>
						<td>{critter.name}</td>
					</tr>
					<tr>
						<td>HP</td>
						<td>{critter.hitpoints}</td>
					</tr>
					<tr>
						<td>Attack</td>
						<td>{critter.attack}</td>
					</tr>
					<tr>
						<td>Defense</td>
						<td>{critter.defense}</td>
					</tr>
				</tbody>
			</table>
		</section>
	)
}

export { Critter }
