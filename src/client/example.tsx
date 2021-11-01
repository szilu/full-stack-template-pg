import React from 'react'
import { Route } from 'react-router-dom'

/////////////////
// ProjectList //
/////////////////
interface Project {
	prjId: number
	userId: number
	email?: string
	status: string
	createTime: Date
}

export function HelloWorld() {
	const [name, setName] = React.useState<string | undefined>()

	React.useEffect(function load() {
		(async function () {
			const res = await fetch('/api/v1/hello/world')
			if (res.ok) {
				const r: { hello: string } = await res.json()
				console.log('RES', r)
				setName(r.hello)
			} else {
				console.log('ERROR', await res.text())
			}
		})()
	}, [])

	return <div className="container">
		<h1 className="text-primary">Hello {name}</h1>
	</div>
}

export function ExampleRoutes() {
	return <Route path="/">
		<HelloWorld/>
	</Route>
}

// vim: ts=4
