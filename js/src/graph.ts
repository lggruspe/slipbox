import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

import { getRoute } from "./route";
import { GraphSchema } from "./schema.js";
import { fetchJson } from "./utils.js";

import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.js";

cytoscape.use(fcose);

declare const MathJax: {
  typeset: (divs: [HTMLDivElement]) => void;
};

declare global {
  interface Window {
    cy: cytoscape.Core | undefined;
  }
}

/**
 * Cytoscape graph layout options.
 */
const layout: cytoscapeFcose.FcoseLayoutOptions = {
  name: "fcose",
  animate: true,
  fit: true,
  nodeDimensionsIncludeLabels: true,
  idealEdgeLength: 100,
};

/**
 * Common rules between different stylesheets.
 */
const stylesheetCommons: cytoscape.Stylesheet[] = [
  // Node styling
  {
    selector: "node",
    style: {
      label: "data(title)",
      "background-color": "gray",
      "text-wrap": "wrap",
      "text-max-width": "120",
    },
  },
  {
    selector: "node.blur",
    style: {
      "background-opacity": 0.5,
      "text-opacity": 0.5,
    },
  },
  {
    selector: "node.sharp",
    style: {
      "background-color": "cornflowerblue",
      "background-opacity": 1,
      "text-opacity": 1,
    },
  },
  {
    selector: "node:selected",
    style: {
      "background-color": "blue",
      "background-opacity": 1,
      "text-opacity": 1,
    },
  },

  // Edge styling
  {
    selector: "edge",
    style: {
      width: "3px",
      "curve-style": "straight",
      "line-color": "gray",
      "line-opacity": 0.5,
    },
  },
  {
    selector: "edge.blur",
    style: {
      "line-opacity": 0.2,
    },
  },
  {
    selector: "edge.sharp",
    style: {
      "line-color": "cornflowerblue",
      "line-opacity": 0.8,
    },
  },

  // Z-indices
  {
    selector: "node.blur",
    style: {
      "z-index": 101,
    },
  },
  {
    selector: "edge.blur",
    style: {
      "z-index": 100,
    },
  },
  {
    selector: "node.sharp",
    style: {
      "z-index": 201,
    },
  },
  {
    selector: "edge.sharp",
    style: {
      "z-index": 200,
    },
  },
  {
    selector: "node:selected",
    style: {
      "z-index": 301,
    },
  },
  {
    selector: "edge:selected",
    style: {
      "z-index": 300,
    },
  },
];

/**
 * Cytoscape graph stylesheet for directed graphs.
 */
const stylesheetDirected: cytoscape.Stylesheet[] = [
  ...stylesheetCommons,
  {
    selector: "edge",
    style: {
      "arrow-scale": 2,
      "target-arrow-color": "gray",
      "target-arrow-shape": "triangle",
    },
  },
  {
    selector: "edge.sharp",
    style: {
      "target-arrow-color": "cornflowerblue",
    },
  },
];

/**
 * Cytoscape graph stylesheet for undirected graphs.
 */
const stylesheetUndirected: cytoscape.Stylesheet[] = [...stylesheetCommons];

// Returns graph dialog and rename hook for renaming label.
function createGraphDialog(): [
  SlDialog,
  (title: string, path: string) => void,
] {
  const dialog = document.createElement("sl-dialog");
  dialog.style.setProperty("--width", "100%");
  dialog.style.setProperty("--body-spacing", "0");
  dialog.innerHTML = `
        <span slot="label">Zettelkasten graph</span>
        <div style="height: 100vh; margin: 0; padding: 0;">
            <hr style="color: transparent; font-size: 1px;" />
        </div>
    `;

  let label = dialog.querySelector("span") as HTMLSpanElement;
  const rename = (title: string, path: string) => {
    const replacement = createDialogLabel(title, path, () => dialog.hide());
    label.replaceWith(replacement);
    label = replacement;
  };
  return [dialog, rename];
}

/**
 * Recolor elements in graph.
 */
function recolor(cy: cytoscape.Core) {
  const selected = cy.elements(":selected");
  cy.elements().removeClass("blur sharp");
  if (selected.length > 0) {
    cy.elements().addClass("blur");
    selected.openNeighborhood().addClass("sharp");
  }
}

function createCytoscape(
  container: HTMLElement,
  data: GraphSchema,
  selectCallback: cytoscape.EventHandler,
  directed: boolean,
): cytoscape.Core {
  const cy = cytoscape({
    container,
    layout,
    style: directed ? stylesheetDirected : stylesheetUndirected,
    selectionType: "additive",
    ...data,
  });

  // Update math in titles.
  cy.nodes().forEach((ele) => {
    const div = document.createElement("div");
    div.innerHTML = ele.data("title");
    MathJax.typeset([div]);
    ele.data("title", div.textContent);
  });

  // Keep track of number of selected nodes.
  cy.on("select", "node", (event) => {
    if (selectCallback) {
      selectCallback(event);
    }
    recolor(event.target.cy());
  });
  cy.on("unselect", "node", (event) => recolor(event.target.cy()));
  return cy;
}

/**
 * Returns path to graph JSON for the current page.
 */
function getGraphDataURL(): string {
  const route = getRoute(window.location.hash);
  switch (route.type) {
    case "note":
      return `graph/note/${route.note}.json`;

    case "reference":
      // TODO show graph of notes that cite reference
      return "graph/data.json";

    case "reference-list":
      return "graph/refs.json";

    case "tag":
      return `graph/tag/${route.tag}.json`;

    case "tag-list":
      return "graph/tags.json";

    case "home":
    case "random":
    case "search":
    case "unknown":
    default:
      // TODO maybe disable graph button instead?
      // TODO rename data.json to notes.json
      return "graph/data.json";
  }
}

function createDialogLabel(
  title: string,
  path: string,
  callback?: () => void,
): HTMLSpanElement {
  const span = document.createElement("span");
  span.slot = "label";
  span.innerHTML = `<a href="#${path}">${title}</a>`;

  if (callback) {
    const a = span.querySelector("a") as HTMLAnchorElement;
    a.addEventListener("click", callback);
  }
  return span;
}

export function initGraphButton(button: HTMLButtonElement) {
  const [dialog, rename] = createGraphDialog();
  const container = dialog.querySelector("div") as HTMLDivElement;

  button.insertAdjacentElement("afterend", dialog);

  button.addEventListener("click", async () => {
    dialog.show();

    const graph = await fetchJson<GraphSchema>(getGraphDataURL());
    const cy = createCytoscape(
      container,
      graph,
      (event) => {
        const { title, path } = event.target.data();
        rename(title, path);
      },
      graph.directed || false,
    );

    let id = window.location.hash;
    if (id === "" || id === "#" || !Number.isInteger(Number(id.slice(1)))) {
      const roots = cy.nodes().roots();
      const index = Math.floor(Math.random() * roots.length);
      id = `#${roots[index].data("id")}`;
    }
    const node = cy.$(id);
    node.select();
    cy.center(node);
    cy.zoom({
      level: 1,
      renderedPosition: node.renderedPosition(),
    });

    window.cy = cy as cytoscape.Core; // expose cy
  });
}
