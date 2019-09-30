import React, { useState } from 'react'

import { monify } from '../utils'

import './Achievements.scss'

const Achievements = () => {
	const [activeAchievements, setActiveAchievements] = useState('money-achievements')

	return (
		<article className="achievements">
			<section className="wrapper">
				<section className="box header">
					<h3>Achievements</h3>
				</section>
				<section className="box sidebar">
					<ul>
						<li onClick={() => setActiveAchievements('money-achievements')}>Money</li>
						<li onClick={() => setActiveAchievements('gatherer-achievements')}>Gatherers</li>
					</ul>
				</section>
				<section className="box content">
					<ul className={'achievement-list money-achievements'.concat(
						activeAchievements === 'money-achievements' ? ' active' : '')}>
						<li>Collect {monify(100)}</li>
						<li>Collect {monify(1000)}</li>
						<li>Collect {monify(10000)}</li>
						<li>Collect {monify(100000)}</li>
						<li>Collect {monify(1000000)}</li>
					</ul>
					<ul className={'achievement-list gatherer-achievements'.concat(
						activeAchievements === 'gatherer-achievements' ? ' active' : '')}>
						<li>Collect 1 gatherer</li>
						<li>Collect 5 gatherers</li>
						<li>Collect 10 gatherers</li>
						<li>Collect 50 gatherers</li>
						<li>Collect 100 gatherers</li>
					</ul>
				</section>
			</section>
		</article>
	)
}

export { Achievements }
