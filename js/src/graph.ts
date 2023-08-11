import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

import { getRoute } from "./route";
import { GraphSchema } from "./schema.js";
import { randomChoice } from "./shuffle";
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
  idealEdgeLength: 150,
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
      "background-color": "darkgray",
      "text-wrap": "wrap",
      "text-max-width": "120",

      // Because the default behavior always draws nodes on top of edges.
      "z-index-compare": "manual",

      // For performance optimization.
      "min-zoomed-font-size": 10,
    },
  },
  {
    selector: "node.blur",
    style: {
      color: "gray",
      "background-color": "lightgray",
    },
  },
  {
    selector: "node.sharp",
    style: {
      "background-color": "cornflowerblue",
      color: "black",
    },
  },
  {
    selector: "node:selected",
    style: {
      "background-color": "blue",
      color: "black",
    },
  },

  // Edge styling
  {
    selector: "edge",
    style: {
      width: "2px",
      "curve-style": "straight",
      "line-color": "darkgray",

      // Because the default behavior always draws nodes on top of edges.
      "z-index-compare": "manual",
    },
  },
  {
    selector: "edge.blur",
    style: {
      "line-color": "lightgray",
    },
  },
  {
    selector: "edge.sharp",
    style: {
      "line-color": "cornflowerblue",
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
      "target-arrow-color": "darkgray",
      "target-arrow-shape": "triangle",
    },
  },
  {
    selector: "edge.blur",
    style: {
      "target-arrow-color": "lightgray",
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
      return `graph/ref/${route.reference}.json`;

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
      return "graph/notes.json";
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

/**
 * Preselects root nodes in directed graphs and a random node in undirected
 * graphs.
 * These are intended to be used as starting points for reading.
 */
async function preselect(cy: cytoscape.Core) {
  const nodes = cy.nodes();
  // TODO does @types/cytoscape have a bug?
  // @ts-ignore
  if (cy.options().directed) {
    const roots = nodes.roots();

    // It can be slow to select multiple nodes, so we'll do it asynchronously.
    cy.startBatch();
    // TODO does @types/cytoscape have a bug?
    // @ts-ignore
    for (const root of roots) {
      root.select();
      await undefined;
    }
    cy.center(roots);
    cy.endBatch();
    return;
  }

  const choice = randomChoice(nodes);
  if (choice == null) {
    return;
  }

  choice.select();
  cy.center(choice);
  cy.zoom({
    level: 1,
    renderedPosition: choice.renderedPosition(),
  });
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

    preselect(cy);
    window.cy = cy as cytoscape.Core; // expose cy
  });
}
