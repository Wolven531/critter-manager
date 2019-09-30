import React from 'react'

import { monify } from '../utils'

import './Achievements.scss'

const Achievements = () => {
	return (
		<article className="achievements">
			<section className="wrapper">
				<section className="box header">
					<h3>Achievements</h3>
				</section>
				<section className="box sidebar">
					<ul>
						<li>Money</li>
						<li>Gatherers</li>
					</ul>
				</section>
				<section className="box content">
					<ul className="achievement-list money-achievements active">
						<li>Collect {monify(100)}</li>
						<li>Collect {monify(1000)}</li>
						<li>Collect {monify(10000)}</li>
						<li>Collect {monify(100000)}</li>
						<li>Collect {monify(1000000)}</li>
					</ul>
					<ul className="achievement-list gatherer-achievements">
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
