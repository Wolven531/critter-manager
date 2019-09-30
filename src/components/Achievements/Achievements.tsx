import React from 'react'

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
				<section className="box content">Content</section>
			</section>
		</article>
	)
}

export { Achievements }
