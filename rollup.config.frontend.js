export default {
  input: 'src/frontend/index.js',
  output: {
    file: 'slipbox/data/bundle.js',
    format: 'es',
    paths: {
      cytoscape: 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.15.2/cytoscape.esm.min.js',
      'fuse.js': 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.0/dist/fuse.esm.js'
    },
  },
  external: ['cytoscape', 'fuse.js']
}
