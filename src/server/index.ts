import init from 'module-alias'
init('.')

export const config = {
	listen: process.env.LISTEN || 80,
	dbURL: process.env.DB_URL || 'postgres://localhost/test'
}

import { createServer } from 'http'
import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
//export { default as Router } from 'koa-router'
export { Router }

import * as koaPg from '@symbion/koa-pg'

import { log } from './utils'
import { init as initExample } from './example'

///////////////////////
// Application state //
///////////////////////
export interface State extends Koa.DefaultState {
	user?: {
		userId: number
	}
}

export interface Context extends koaPg.Context {
	state: State
	router: Router<State, Context>
}

export type App = Koa<State, Context>
export type Next = Koa.Next

/////////////////
// Middlewares //
/////////////////
function accept(ctx: Context, next: Next) {
	if (ctx.method === 'GET'
		|| ctx.method === 'DELETE'
		|| ctx.header['content-type'] === 'application/json'
		|| ctx.header['content-type']?.startsWith('multipart/form-data;')) {
		return next()
	} else {
		console.error('Invalid Content-Type: ' + ctx.header['content-type'])
		ctx.throw(400)
	}
}

//////////
// Init //
//////////
const app: App = new Koa<State, Context>()
const router = new Router<State, Context>()
//app.proxy = true
app.context.router = router
app.context.config = config

app
	.use(async (ctx, next) => {
		const t = Date.now()
		try {
			await next()
			log(ctx, 'N', `REQ: ${ctx.request.ip} u:${ctx.state.user?.userId || '-'} t:${Date.now() - t}ms ${ctx.status} ${ctx.method} ${ctx.path} ${ctx.search}`)
		} catch (err) {
			log(ctx, 'E', `REQ: ${ctx.request.ip} u:${ctx.state.user?.userId || '-'} t:${Date.now() - t}ms ${err.status || ctx.status} ${ctx.method} ${ctx.path} ${ctx.search}`)
			throw err
		}
	})
	.use(koaStatic('./dist'))
	.use(accept)
	.use(koaBody({
		jsonLimit: '10mb'
	}))
	.use(app.context.router.routes())
	.use(app.context.router.allowedMethods())

const httpServer = createServer(app.callback())
httpServer.listen(config.listen, async () => {
	console.log('====[ BOOTING ]=======================================================')

	await koaPg.init(app, { url: config.dbURL })
	await initExample(app)

	console.log('====[ SERVER READY ]==================================================')
	console.log(`Listening on port ${config.listen}`)
})

// vim: ts=4
