import cytoscape from 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.15.2/cytoscape.esm.min.js';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.0/dist/fuse.esm.js';

function createGraphArea () {
  const div = document.createElement('div');
  div.style.width = '100%';
  div.style.height = '500px';
  div.style.position = 'relative';
  div.style.top = '0px';
  div.style.left = '0px';
  return div
}

function getNoteElement (slipbox, id, currentNote = false) {
  const element = {
    data: {
      id: id,
      label: id
    }
  };
  if (currentNote) {
    element.data.color = 'white';
  }
  return element
}

function getLinkElement (slipbox, type, source, target) {
  console.assert(['backlink', 'direct', 'sequence'].includes(type));
  const id = type.slice(0, 1) + `${source}-${target}`;
  const style = type === 'backlink' ? 'dashed' : 'solid';
  const color = type === 'sequence' ? 'red' : 'black';
  return {
    data: { id, source, target, arrow: 'triangle', style, color }
  }
}

function * getNeighborElements (slipbox, id) {
  yield getNoteElement(slipbox, id, true);

  const note = slipbox.notes[id];
  for (const backlink of note.backlinks) {
    yield getNoteElement(slipbox, backlink.src);
    yield getLinkElement(slipbox, 'backlink', backlink.src, id);
  }
  for (const link of note.links) {
    yield getNoteElement(slipbox, link.dest);
    yield getLinkElement(slipbox, 'direct', id, link.dest);
  }

  for (const alias of note.aliases) {
    const parent = slipbox.aliases[alias].parent;
    const pid = parent ? slipbox.aliases[parent].id : -1;
    if (pid !== -1) {
      yield getNoteElement(slipbox, pid);
      yield getLinkElement(slipbox, 'sequence', pid, id);
    }
    // children
    for (const child of slipbox.aliases[alias].children) {
      console.assert(id === slipbox.aliases[alias].id);
      const cid = slipbox.aliases[child].id;
      if (!Number.isInteger(cid)) continue
      yield getNoteElement(slipbox, cid);
      yield getLinkElement(slipbox, 'sequence', id, cid);
    }
  }
}

function createCytoscape (container, elements) {
  return cytoscape({
    directed: true,
    multigraph: true,
    container: container,
    elements: elements,
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          height: 'label',
          width: 'label',
          padding: '8px',
          'text-halign': 'center',
          'text-valign': 'center'
        }
      },
      {
        selector: 'node[color]',
        style: {
          'background-color': 'black',
          color: 'data(color)',
          label: 'data(label)',
          height: 'label',
          width: 'label',
          padding: '8px',
          'text-halign': 'center',
          'text-valign': 'center'
        }
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'curve-style': 'bezier',
          'line-color': 'data(color)',
          'line-style': 'data(style)'
        }
      },
      {
        selector: 'edge[arrow]',
        style: {
          'target-arrow-color': 'data(color)',
          'target-arrow-shape': 'data(arrow)'
        }
      }
    ]
  })
}

function init (slipbox) {
  let container = createGraphArea();

  function resetGraph () {
    container.remove();
    const id = Number(window.location.hash.slice(1));
    if (!Number.isInteger(id)) return

    const elements = Array.from(getNeighborElements(slipbox, id));
    if (elements.length < 2) return

    container = createGraphArea();
    document.body.append(container);
    const cy = createCytoscape(container, elements);
    cy.layout({ name: 'cose' }).run();
    cy.reset();
    cy.center();
  }

  window.addEventListener('DOMContentLoaded', resetGraph);
  window.addEventListener('hashchange', resetGraph);
}

function createFuse () {
  const options = {
    includeMatches: true,
    ignoreLocation: true,
    keys: ['textContent'],
    threshold: 0.45
  };
  const nodes = document.body.querySelectorAll('section.level1');
  const sections = Array.prototype.filter.call(nodes, function (node) {
    return Number.isInteger(Number(node.id))
  });
  return new Fuse(sections, options)
}

function getSearchResults (fuse) {
  const div = document.querySelector('input.search-bar');
  return fuse.search(div.value)
}

function displayResults (results) {
  const div = document.querySelector('div.search-results');
  div.textContent = '';
  for (const result of results) {
    const p = document.createElement('p');
    const h3 = document.createElement('h3');
    h3.innerHTML = `<a href="#${result.item.id}">${result.item.title}</a>`;
    p.appendChild(h3);

    let count = 3;
    for (const child of result.item.children) {
      const clone = child.cloneNode(true);
      if (count-- <= 0) break
      if (clone.tagName === 'H1' && clone.title === result.item.title) {
        continue
      }
      p.appendChild(clone);
    }

    div.appendChild(p);
    div.appendChild(document.createElement('hr'));
  }
}

function searchNotes (fuse) {
  const results = getSearchResults(fuse);
  displayResults(results);
}

function createSearchBar () {
  const form = document.createElement('form');
  form.action = 'javascript:void(0)';
  form.style.textAlign = 'center';

  const fuse = createFuse();

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search notes...';
  input.classList.add('search-bar');
  input.style.width = '80%';
  input.addEventListener('change', () => searchNotes(fuse));

  form.appendChild(input);
  return form
}

function createSearchResults () {
  const div = document.createElement('div');
  div.classList.add('search-results');
  return div
}

function createSearchPage () {
  const page = document.createElement('section');
  page.id = 'search';
  page.title = 'Search';
  page.classList.add('level1');
  page.appendChild(createSearchBar());
  page.appendChild(document.createElement('br'));
  page.appendChild(createSearchResults());
  return page
}

function createSearchButton () {
  const a = document.createElement('a');
  a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>';
  a.href = '#search';
  a.title = 'Search notes';
  return a
}

function init$1 () {
  window.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(createSearchPage());
    document.body.insertBefore(createSearchButton(), document.body.firstChild);
  });
}

function hideSections () {
  const sections = document.getElementsByTagName('section');
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.classList.contains('level1')) {
      if (Number.isInteger(Number(section.id))) {
        section.style.display = 'none';
      } else if (section.id.charAt(0) === '#') {
        section.style.display = 'none';
      } else if (section.id === 'references') {
        section.style.display = 'none';
      } else if (section.id.slice(0, 4) === 'ref-') {
        section.style.display = 'none';
      } else if (section.id === 'search') {
        section.style.display = 'none';
      } else if (section.id === 'tags') {
        section.style.display = 'none';
      }
    }
  }
}

function getSectionFromHash (hash) {
  const id = hash.substring(1);
  if (!id) { return null }
  const elem = document.getElementById(id);
  if (elem) {
    return elem.closest('section.level1')
  }
}

let _previousHash = window.location.hash;
function changeSection () {
  const oldSection = getSectionFromHash(_previousHash);
  if (oldSection) {
    oldSection.style.display = 'none';
  }
  _previousHash = window.location.hash;
  const newSection = getSectionFromHash(_previousHash);
  if (newSection) {
    newSection.style.display = '';
    document.title = newSection.title || 'Slipbox';
  } else {
    window.location.hash = '#0';
  }
  window.scrollTo(0, 0);
}

function addNotFoundSection () {
  const section = document.createElement('section');
  section.id = '0';
  section.classList.add('level1');
  const h1 = document.createElement('h1');
  h1.innerText = 'Note not found';
  section.appendChild(h1);
  document.body.appendChild(section);
}

function init$2 () {
  window.addEventListener('DOMContentLoaded', addNotFoundSection);
  window.addEventListener('DOMContentLoaded', hideSections);
  window.addEventListener('DOMContentLoaded', changeSection);
  window.addEventListener('hashchange', changeSection);
}

function A (innerText, href, title) {
  const a = document.createElement('a');
  a.innerText = innerText;
  a.href = href;
  if (title != null) {
    a.title = title;
  }
  return a
}

function Li (children) {
  const li = document.createElement('li');
  for (const child of children) {
    li.appendChild(child);
  }
  return li
}

function aliasOwner (alias) {
  const found = alias.match(/^\d+/);
  return found ? found[0] : ''
}

function compareSeeAlsoItems (a, b) {
  const atext = a.innerText;
  const btext = b.innerText;
  return atext < btext ? -1 : atext === btext ? 0 : 1
}

function * generateBacklinkLis (slipbox, id) {
  console.assert(slipbox);
  console.assert(slipbox.notes);
  console.assert(typeof (id) === 'number');
  const notes = slipbox.notes;
  const note = notes[id] || { backlinks: [] };
  for (const link of note.backlinks) {
    console.assert(typeof (link.src) === 'number');
    console.assert(notes[link.src]);
    console.assert(typeof (notes[link.src].title) === 'string');
    console.assert(notes[link.src].title);
    yield Li([
      document.createTextNode('[' + link.src + '] '),
      A(notes[link.src].title, '#' + link.src, link.annotation)
    ]);
  }
}

function * generateDirectLinkLis (slipbox, id) {
  console.assert(slipbox);
  console.assert(slipbox.notes);
  console.assert(typeof (id) === 'number');
  const notes = slipbox.notes;
  const note = notes[id] || { backlinks: [] };
  for (const link of note.links) {
    console.assert(typeof (link.dest) === 'number');
    console.assert(notes[link.dest]);
    console.assert(typeof (notes[link.dest].title) === 'string');
    console.assert(notes[link.dest].title);
    const b = document.createElement('b');
    b.appendChild(document.createTextNode(`[${link.dest}] `));
    yield Li([b, A(notes[link.dest].title, '#' + link.dest, link.annotation)]);
  }
}

function * generateParentLis (slipbox, id) {
  console.assert(slipbox);
  console.assert(slipbox.notes);
  console.assert(typeof (id) === 'number');
  const notes = slipbox.notes;
  const note = notes[id] || { aliases: [] };
  for (const alias of note.aliases) {
    console.assert(slipbox.aliases[alias]);
    const parentAlias = slipbox.aliases[alias].parent;
    if (parentAlias) {
      const parentId = slipbox.aliases[parentAlias].id;
      console.assert(typeof (parentId) === 'number');
      yield Li([
        document.createTextNode(`[${parentId}/${parentAlias}] `),
        A(slipbox.notes[parentId].title, '#' + parentId)
      ]);
    }
  }
}

function * generateChildLis (slipbox, id) {
  console.assert(slipbox);
  console.assert(slipbox.notes);
  console.assert(typeof (id) === 'number');
  const notes = slipbox.notes;
  const note = notes[id] || { aliases: [] };
  for (const alias of note.aliases) {
    console.assert(slipbox.aliases[alias]);
    for (const child of slipbox.aliases[alias].children) {
      const childId = slipbox.aliases[child].id;
      yield Li([
        document.createTextNode(`[${childId}/${child}] `),
        A(slipbox.notes[childId].title, '#' + childId)
      ]);
    }
  }
}

function createRelatedUl (slipbox, id) {
  const lis = Array.from(generateBacklinkLis(slipbox, id));
  for (const li of generateDirectLinkLis(slipbox, id)) {
    lis.push(li);
  }
  for (const li of generateParentLis(slipbox, id)) {
    lis.push(li);
  }
  for (const li of generateChildLis(slipbox, id)) {
    lis.push(li);
  }
  lis.sort(compareSeeAlsoItems);
  const ul = document.createElement('ul');
  for (const li of lis) {
    ul.appendChild(li);
  }
  return ul
}

function createSeeAlsoDiv (slipbox, id) {
  const div = document.createElement('div');
  div.id = 'slipbox-see-also';
  const ul = createRelatedUl(slipbox, id);
  if (ul.children.length > 0) {
    const h3 = document.createElement('h3');
    h3.innerText = 'See also';
    div.appendChild(h3);
    div.appendChild(ul);
  }
  return div
}

function createAliasesP (slipbox, id) {
  console.assert(slipbox);
  console.assert(slipbox.notes);
  console.assert(typeof (id) === 'number');
  const note = slipbox.notes[id] || { aliases: [] };
  const p = document.createElement('p');
  p.id = 'slipbox-aliases';
  const aliases = note.aliases.map(alias => {
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(' ['));
    span.appendChild(A(alias, '#' + aliasOwner(alias)));
    span.appendChild(document.createTextNode(']'));
    return span
  });
  if (aliases.length > 0) {
    const text = document.createElement('strong');
    text.innerText = 'Aliases:';
    p.appendChild(text);
    aliases.forEach(alias => p.appendChild(alias));
  }
  return p
}

function setAliasesP (slipbox, id) {
  const p = document.getElementById('slipbox-aliases');
  if (p) {
    p.remove();
  }
  document.body.appendChild(createAliasesP(slipbox, id));
}

function setSeeAlsoDiv (slipbox, id) {
  const div = document.getElementById('slipbox-see-also');
  if (div) {
    div.remove();
  }
  document.body.appendChild(createSeeAlsoDiv(slipbox, id));
}

function seeAlso (slipbox, hash) {
  const section = getSectionFromHash(hash); // closest level1 ancestor
  const id = section ? Number(section.id) : 0;
  setAliasesP(slipbox, id);
  setSeeAlsoDiv(slipbox, id);
}

function init$3 (slipbox) {
  window.addEventListener('hashchange', function () {
    seeAlso(slipbox, window.location.hash);
  });

  window.addEventListener('DOMContentLoaded', function () {
    seeAlso(slipbox, window.location.hash);
  });
}

init$1();
init$3(slipbox);
init$2();
init(slipbox);
