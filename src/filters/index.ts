#!/usr/bin/env node
import { strict as assert } from 'assert'
import { existsSync } from 'fs'
import * as process from 'process'

import {
  create,
  filter as f,
  get,
  set,
  types as t,
  utils,
  withAttributes
} from 'pandoc-tree'

import {
  fileExtension,
  fileToBase64,
  parseFilename,
  parseHeaderText,
  parseLink,
  isReferenceId,
  isTopLevelSection,
  hashtagPrefix
} from './utils.js'
import { Slipbox } from './slipbox.js'

const { makeTopLevelSections, stringify } = utils
const { interact, walkBlocks } = f

function preprocess (): f.FilterSet {
  function Pandoc (doc: t.Pandoc) {
    let filename = ''
    for (const elem of doc.blocks) {
      if (elem.t === 'RawBlock') {
        if (get.format(elem) === 'html') {
          filename = parseFilename(elem) || filename
        }
      } else if (elem.t === 'Header') {
        if (get.level(elem) === 1) {
          assert(filename)
          get.attributes(elem).push(['filename', filename])
        }
      }
    }
    return doc
  }
  return { Pandoc }
}

function init (slipbox: Slipbox): f.FilterSet {
  function RawBlock (elem: t.RawBlock) {
    if (get.format(elem) === 'html' && parseFilename(elem)) {
      return []
    }
  }

  function Header (elem: t.Header) {
    if (get.level(elem) !== 1) return
    const content = stringify(elem)
    const { id, title } = parseHeaderText(content)
    if (id != null && title != null) {
      set.identifier(elem, String(id))
      let filename = ''
      withAttributes(elem, attr => {
        attr.title = title
        filename = attr.filename
        delete attr.filename
      })
      assert(filename)
      slipbox.saveNote(get.identifier(elem), title, filename)
      return elem
    }
  }

  function Pandoc (doc: t.Pandoc) {
    doc.blocks = makeTopLevelSections(
      doc.blocks,
      header => create.Attr(get.identifier(header), ['level1'])
    )
    slipbox.saveNotes()
    return doc
  }

  return { Header, RawBlock, Pandoc }
}

function collect (slipbox: Slipbox): f.FilterSet {
  function Div (div: t.Div) {
    if (!isTopLevelSection(div)) return

    let hasEmptyLink = false

    function Cite (elem: t.Cite) {
      for (const citation of Object.values(get.citations(elem))) {
        slipbox.saveCite(get.identifier(div), get.id(citation))
      }
    }

    function Link (elem: t.Link) {
      if (!get.target(elem)) {
        hasEmptyLink = true
        return get.content(elem)
      }

      const identifier = get.identifier(div)
      const link = parseLink(identifier, elem)
      if (!link) return
      if (link.tag === 'direct') {
        slipbox.saveLink(link.src, link.dest, link.description)
      } else if (link.tag === 'sequence') {
        slipbox.saveAlias(link.description, link.dest, link.src)
      }
    }

    function Str (elem: t.Str) {
      const text = get.text(elem)
      if (hashtagPrefix(text)) {
        slipbox.saveTag(get.identifier(div), text)
      }
    }

    const filter = { Cite, Link, Str }
    set.content(div, walkBlocks(get.content(div), filter))
    if (hasEmptyLink) {
      slipbox.hasEmptyLink(get.identifier(div))
    }
    return div
  }

  function Pandoc (doc: t.Pandoc) {
    slipbox.saveAliases()
    slipbox.saveSequences()
    slipbox.saveCitations()
    slipbox.saveLinks()
    slipbox.saveTags()
    return doc
  }

  return { Div, Pandoc }
}

function modify (slipbox: Slipbox): f.FilterSet {
  function Div (div: t.Div) {
    if (!isTopLevelSection(div)) return

    function Link (elem: t.Link) {
      const content = stringify(elem)
      if (!content) {
        const target = get.target(elem)
        return [
          create.Str(' ['),
          create.Link(
            [create.Str(target)],
            target,
            get.title(elem)
          ),
          create.Str(']')
        ]
      }
    }

    function Str (elem: t.Str) {
      const text = get.text(elem)
      if (hashtagPrefix(text)) {
        const src = '#' + text
        return create.Link([elem], src)
      }
    }

    const footnotes: Array<t.Block> = []
    function Note (elem: t.Note) {
      footnotes.push(create.Div(get.content(elem)))
      return create.Superscript([create.Str(String(footnotes.length))])
    }

    const filter = { Link, Note, Str }
    set.content(div, walkBlocks(get.content(div), filter))
    if (footnotes.length > 0) {
      // insert footnotes into document
      get.content(div).push(create.HorizontalRule())
      get.content(div).push(create.OrderedList(footnotes.map(fn => [fn])))
    }
    if (get.classes(div).includes('level1')) {
      // hide sections
      get.attributes(div).push(['style', 'display:none'])
    }
    return div
  }
  return { Div }
}

function citations (slipbox: Slipbox): f.FilterSet {
  const references: Array<[string, string]> = []
  function Div (div: t.Div) {
    if (get.identifier(div) === 'refs') {
      walkBlocks(get.content(div), {
        Div: (elem: t.Div) => {
          const id = get.identifier(elem)
          if (isReferenceId(id)) {
            references.push([id, stringify(elem)])
          }
        }
      })
      return []
    }
  }
  function Pandoc (doc: t.Pandoc) {
    slipbox.saveReferences(references)
    return doc
  }
  return { Div, Pandoc }
}

function images (): f.FilterSet {
  const convert = process.env.CONVERT_TO_DATA_URL
  if (!convert) return {}
  return {
    Image: function (elem) {
      const src = get.src(elem)
      if (!existsSync(src)) return
      const ext = fileExtension(src)
      if (ext) {
        const base64 = fileToBase64(src)
        set.src(elem, `data:image/${ext};base64,${base64}`)
        return elem
      }
    }
  }
}

function commit (slipbox: Slipbox): f.FilterSet {
  function Pandoc (doc: t.Pandoc) {
    slipbox.checkEmptyLinks()
    return doc
  }
  return { Pandoc }
}

function main () {
  const slipbox = new Slipbox()
  const filters = [
    preprocess(),
    init(slipbox),
    collect(slipbox),
    modify(slipbox),
    citations(slipbox),
    images(),
    commit(slipbox)
  ]
  interact(filters)
}

main()
