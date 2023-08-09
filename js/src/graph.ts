import cytoscape from "cytoscape";
import { Core, EventHandler } from "cytoscape";
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
    cy: Core | undefined;
  }
}

function createLayout(): cytoscapeFcose.FcoseLayoutOptions {
  return {
    name: "fcose",
    animate: true,
    fit: true,
    nodeDimensionsIncludeLabels: true,
  };
}

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

function createCytoscape(
  container: HTMLElement,
  data: GraphSchema,
  selectCallback: EventHandler,
): Core {
  const cy = cytoscape({
    container,
    style: [
      {
        selector: "node:selected",
        style: {
          "background-color": "#9333ea",
        },
      },
      {
        selector: "node",
        style: {
          label: "data(title)",
          "text-wrap": "wrap",
          "text-max-width": "120",
        },
      },
      {
        selector: "edge",
        style: {
          "curve-style": "bezier",
          "target-arrow-shape": "triangle",
        },
      },
    ],
    layout: createLayout(),
    ...data,
  });

  /// Update titles
  cy.nodes().forEach((ele) => {
    const div = document.createElement("div");
    div.innerHTML = ele.data("title");
    MathJax.typeset([div]);
    ele.data("title", div.textContent);
  });

  if (selectCallback) cy.on("select", "node", selectCallback);
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
  button.insertAdjacentElement("afterend", dialog);
  button.addEventListener("click", async () => {
    dialog.show();

    const container = dialog.querySelector("div") as HTMLDivElement;
    const cy = createCytoscape(
      container,
      await fetchJson<GraphSchema>(getGraphDataURL()),
      (event) => {
        const { title, path } = event.target.data();
        rename(title, path);
      },
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

    window.cy = cy as Core; // expose cy
  });
}
