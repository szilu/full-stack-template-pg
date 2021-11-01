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
	const [name, setName] = React.useState('')
	const [greeting, setGreeting] = React.useState<string | undefined>()

	React.useEffect(function load() {
		(async function () {
			const res = await fetch('/api/v1/hello', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({ name })
			})
			if (res.ok) {
				const r: { hello: string } = await res.json()
				console.log('RES', r)
				setGreeting(r.hello)
			} else {
				console.log('ERROR', await res.text())
			}
		})()
	}, [name])

	return <div className="container">
		<div className="card p-5 m-5 bg-light">
			<h1 className="text-primary text-center mb-5">{greeting}</h1>
			<label className="form=label">
				Enter your name, please
				<input className="form-control" onChange={evt => setName(evt.target.value)} value={name} autoFocus/>
			</label>
		</div>
	</div>
}

export function ExampleRoutes() {
	return <Route path="/">
		<HelloWorld/>
	</Route>
}

// vim: ts=4
