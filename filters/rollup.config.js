import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'build/index.js',
  output: {
    file: 'dist/filter.js',
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [resolve(), commonjs()],
  external: ['assert', 'better-sqlite3', 'fs', 'process']
}
