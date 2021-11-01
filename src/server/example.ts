import { App, State, Context, Router, config } from './index'
import { pgMiddleware } from '@symbion/koa-pg'

import { HelloWorld } from '~/common/example'

async function getHelloWorld(ctx: Context) {
	const res = await ctx.db.func('SELECT initcap($1)', ['world!'])

	ctx.body = {
		hello: res
	}
}

async function postHello(ctx: Context) {
	const name = ctx.request.body?.name

	const res = await ctx.db.func("SELECT 'Hello ' || initcap($1) || '!'", [name || 'world'])

	ctx.body = {
		hello: res
	}
}

// Module init
export async function init(app: App) {
	const router = new Router<State, Context>()

	// Routes
	router.get('/world', getHelloWorld)
	router.post('/', postHello)
	// /Routes

	app.context.router.use('/api/v1/hello', pgMiddleware, router.routes())
	console.log('EXAMPLE module initialized')
}

// vim: ts=4
