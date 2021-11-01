import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import config from '~/../config'

import { Layout } from './layout'

/////////
// App //
/////////
function App() {
	return <BrowserRouter>
		<Layout/>
	</BrowserRouter>
}

const app = document.getElementById('application')
render(<App/>, app)

// vim: ts=4
