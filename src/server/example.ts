import { App, State, Context, Router, config } from './index'
import { pgMiddleware } from '@symbion/koa-pg'

import { tHello } from '~/common/example'
import { log, validate, validateQS } from '~/server/utils'

async function getHello(ctx: Context) {
	const qs = validateQS(ctx, tHello)

	try {
		const res = await ctx.db.func("SELECT 'Hello ' || initcap($1) || '!'", [qs.name || 'world'])
		ctx.body = {
			hello: res
		}
	} catch (err) {
		if (err instanceof Error) log(ctx, 'E', err.toString())
	}
}

async function postHello(ctx: Context) {
	const body = validate(ctx, tHello)

	try {
		const res = await ctx.db.func("SELECT 'Hello ' || initcap($1) || '!'", [body.name || 'world'])
		ctx.body = {
			hello: res
		}
	} catch (err) {
		if (err instanceof Error) log(ctx, 'E', err.toString())
	}
}

// Module init
export async function init(app: App) {
	const router = new Router<State, Context>()

	// Routes
	router.get('/', getHello)
	router.post('/', postHello)
	// /Routes

	app.context.router.use('/api/v1/hello', pgMiddleware, router.routes())
	console.log('EXAMPLE module initialized')
}

// vim: ts=4
