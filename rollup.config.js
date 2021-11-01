const extensions = ['.js', '.ts', '.tsx']
const isProd = process.env.NODE_ENV === 'production'

import path from 'path'
import analyze from 'rollup-plugin-analyzer'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import progress from 'rollup-plugin-progress'
import postcss from 'rollup-plugin-postcss'
import gzip from 'rollup-plugin-gzip'

export default {
	input: 'src/client/main.tsx',
	output: {
		dir: isProd ? './dist/assets' : './dist/assets-dev',
		assetFileNames: '[name].[ext]',
		name: 'main',
		format: 'iife'
	},
	plugins: [
		alias({ entries: { "~": path.join(__dirname, 'src') }}),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
		}),
		resolve({ extensions }),
		commonjs(),
		isProd && terser(),
		postcss({
			//extract: true,
			extract: 'main.css',
			minimize: isProd
			//extract: path.resolve('dist/')
		}),
		gzip(),
		progress(),
		typescript({ module: 'ES2015' }),
		isProd && analyze({ summaryOnly: true })
	],
	// This is needed because typescript generates buggy ES6 module files:
	onwarn: (warning, warn) => warning.code === 'THIS_IS_UNDEFINED' || warn(warning)
}

// vim: ts=4
