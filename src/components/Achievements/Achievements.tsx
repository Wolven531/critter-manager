import React, { useState } from 'react'

import { monify } from '../utils'

import { initAchievements } from '../../state/initializers'

import './Achievements.scss'

const ACHIEVEMENTS_GATHERER = 'gatherer-achievements'
const ACHIEVEMENTS_MONEY = 'money-achievements'

const Achievements = () => {
	const [activeAchievements, setActiveAchievements] = useState(ACHIEVEMENTS_MONEY)
	const [achievementsGatherLevel] = initAchievements('gather')
	const [achievementsMoneyLevel] = initAchievements('money')

	return (
		<article className="achievements">
			<section className="wrapper">
				<section className="box header">
					<h3>Achievements</h3>
				</section>
				<section className="box sidebar">
					<ul>
						<li onClick={() => setActiveAchievements(ACHIEVEMENTS_MONEY)}>Money</li>
						<li onClick={() => setActiveAchievements(ACHIEVEMENTS_GATHERER)}>Gatherers</li>
					</ul>
				</section>
				<section className="box content">
					<ul className={[
						'achievement-list',
						ACHIEVEMENTS_MONEY,
						activeAchievements === ACHIEVEMENTS_MONEY ? ' active' : ''
					].join(' ')}>
						<li className={achievementsMoneyLevel > 0 ? 'completed' : ''}>Collect {monify(100)}</li>
						<li className={achievementsMoneyLevel > 1 ? 'completed' : ''}>Collect {monify(1000)}</li>
						<li className={achievementsMoneyLevel > 2 ? 'completed' : ''}>Collect {monify(10000)}</li>
						<li className={achievementsMoneyLevel > 3 ? 'completed' : ''}>Collect {monify(100000)}</li>
						<li className={achievementsMoneyLevel > 4 ? 'completed' : ''}>Collect {monify(1000000)}</li>
					</ul>
					<ul className={[
						'achievement-list',
						ACHIEVEMENTS_MONEY,
						activeAchievements === ACHIEVEMENTS_GATHERER ? ' active' : ''
					].join(' ')}>
						<li className={achievementsGatherLevel > 0 ? 'completed' : ''}>Collect 1 gatherer</li>
						<li className={achievementsGatherLevel > 1 ? 'completed' : ''}>Collect 5 gatherers</li>
						<li className={achievementsGatherLevel > 2 ? 'completed' : ''}>Collect 10 gatherers</li>
						<li className={achievementsGatherLevel > 3 ? 'completed' : ''}>Collect 50 gatherers</li>
						<li className={achievementsGatherLevel > 4 ? 'completed' : ''}>Collect 100 gatherers</li>
					</ul>
				</section>
			</section>
		</article>
	)
}

export { Achievements }
