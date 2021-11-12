import * as t from '@symbion/runtype'
import { Next, Context } from './index'

export function validate<T>(ctx: Context, reqType: t.Type<T>, value: Object = ctx.request.body): T {
	const result = reqType.decode(value, { coerceDate: true })
	if (t.isOk(result)) {
		return result.ok
	} else {
		const body = {
			error: 'E-PARSE',
			details: result.err
		}
		console.log('ERROR', JSON.stringify(body, null, 4))
		ctx.throw(422, JSON.stringify(body))
	}
}

export function validateQS<T>(ctx: Context, reqType: t.Type<T>, value: Object = ctx.request.query): T {
	const result = reqType.decode(value, { coerceAll: true })
	if (t.isOk(result)) {
		return result.ok
	} else {
		const body = {
			error: 'E-PARSE',
			details: result.err
		}
		console.log(JSON.stringify(body, null, 4))
		ctx.throw(422, JSON.stringify(body))
	}
}

type LogSeverity =
	'F' // Fatal error (system is unusable)
	| 'E' // Handled error
	| 'W' // Warning
	| 'N' // Notice
	| 'D' // Debug

export function log(ctx: Context, severity: LogSeverity, text: string, data?: Object) {
	const ts = (new Date()).toISOString()
	console.log(`${severity} ${ts} ${text} ${data || ''}`)
}

// vim: ts=4
