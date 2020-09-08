import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'build/index.js',
  output: {
    file: 'slipbox/data/filter.js',
    format: 'es',
  },
  plugins: [resolve(), commonjs()],
  external: ['assert', 'better-sqlite3', 'fs', 'process']
}
