import React from 'react'
import { render } from 'react-dom'
import { Route, Link, NavLink, Redirect, useLocation, useHistory } from 'react-router-dom'

import config from '~/../config'
import { ExampleRoutes } from './example'

////////////
// Header //
////////////
export function Header() {
	return <nav className="navbar navbar-expand navbar-light bg-light">
		<div className="container-fluid">
			<Link className="navbar-brand" to="/">Demo</Link>
		</div>
	</nav>
}

////////////
// Layout //
////////////
export function Layout() {
	return <>
		<Header/>

		<div className="container mt-3">
			<ExampleRoutes/>
		</div>
		<footer className="pt-4 mt-2 mt-md-4 border-top bg-light">
			<div className="row">
				<div className="col-12 text-center">
					<small className="d-block mb-3 text-muted">© 2021 Symbion Products Ltd.</small>
				</div>
			</div>
		</footer>
	</>
}

// vim: ts=4
