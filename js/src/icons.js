import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js'

registerIconLibrary('boxicons', {
  resolver: name => {
    let folder = 'regular'
    if (name.substring(0, 4) === 'bxs-') folder = 'solid'
    if (name.substring(0, 4) === 'bxl-') folder = 'logos'
    return `assets/boxicons/svg/${folder}/${name}.svg`
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
})
