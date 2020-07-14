export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  external: ['cytoscape', 'fuse.js']
}
