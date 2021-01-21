import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    exports: 'auto',
    file: 'dist/frontend.js',
    paths: {
      cytoscape: 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.17.1/cytoscape.esm.min.js',
      'fuse.js': 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3/dist/fuse.esm.js'
    },
  },
  external: ['cytoscape', 'fuse.js'],
  plugins: [commonjs(), nodeResolve()]
}
