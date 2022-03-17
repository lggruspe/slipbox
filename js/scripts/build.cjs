const fs = require('fs/promises')
const { dirname, relative } = require('path')
const { exit } = require('process')

const { analyzeMetafile, build } = require('esbuild')

const copyMathjax = {
  name: 'copyMathjax',
  setup (build) {
    const es5 = dirname(require.resolve('mathjax'))
    const mathjax = dirname(es5)
    const dest = dirname(build.initialOptions.outfile)
    build.onEnd(() => {
      const options = {
        recursive: true,
        filter: path => {
          const relpath = relative(mathjax, path)
          return relpath === '' || relpath.startsWith('es5')
        }
      }
      // NOTE cp is experimental
      fs.cp(mathjax, dest, options)
    })
  }
}

async function main () {
  const result = await build({
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    outfile: 'dist/app.min.js',
    metafile: true,
    format: 'esm',
    external: ['mathjax'],
    plugins: [copyMathjax]
  })

  const text = await analyzeMetafile(result.metafile)
  console.log(text)
}

main().catch(() => exit(1))
