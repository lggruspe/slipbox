export default {
  input: 'src/index.js',
  output: {
    file: 'dist/frontend.js',
    format: 'es',
    paths: {
      cytoscape: 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.17.1/cytoscape.esm.min.js',
      'fuse.js': 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3/dist/fuse.esm.js'
    },
  },
  external: ['cytoscape', 'fuse.js']
}
