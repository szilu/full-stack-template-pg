import { App, State, Context, Router, config } from './index'

import { HelloWorld } from '~/common/example'

async function getHelloWorld(ctx: Context) {
	ctx.body = {
		hello: 'World!'
	}
}

// Module init
export async function init(app: App) {
	const router = new Router<State, Context>()

	// Routes
	router.get('/world', getHelloWorld)
	// /Routes

	app.context.router.use('/api/v1/hello', router.routes())
	console.log('EXAMPLE module initialized')
}

// vim: ts=4
