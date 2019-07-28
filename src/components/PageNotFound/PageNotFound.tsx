    
import React, { FC, useEffect } from 'react'

const PageNotFound: FC = () => {
	useEffect(() => {
		window.document.title = 'Page Not Found'
	}, [])// empty (no arg) to track nothing, just fire on mount/unmount

	return (
		<h1>Page not found</h1>
	)
}

export { PageNotFound }
