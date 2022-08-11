import cytoscape from "cytoscape";
import { Core, EventHandler } from "cytoscape";

import { GraphSchema } from "./schema.js";
import { fetchJson } from "./utils.js";

import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.js";

declare const MathJax: {
    typeset: (divs: [HTMLDivElement]) => void;
};

declare global {
    interface Window {
        cy: Core | undefined;
    }
}

// Returns graph dialog and rename hook for renaming label.
function createGraphDialog(): [SlDialog, (title: string, id: number) => void] {
    const dialog = document.createElement("sl-dialog");
    dialog.style.setProperty("--width", "100%");
    dialog.innerHTML = `
        <span slot="label">Zettelkasten graph</span>
        <div style="height: 100vh; margin: 0; padding: 0;">
            <hr style="color: transparent; font-size: 1px;" />
        </div>
    `;

    let label = dialog.querySelector("span") as HTMLSpanElement;
    const rename = (title: string, id: number) => {
        const replacement = createDialogLabel(title, id, () => dialog.hide());
        label.replaceWith(replacement);
        label = replacement;
    };
    return [dialog, rename];
}

function createCytoscape(container: HTMLElement, data: GraphSchema, selectCallback: EventHandler): Core {
    const cy = cytoscape({
        container,
        style: [
            {
                selector: "node:selected",
                style: {
                    "background-color": "#9333ea"
                }
            },
            {
                selector: "node",
                style: {
                    label: "data(title)",
                    "text-wrap": "wrap",
                    "text-max-width": "120"
                }
            },
            {
                selector: "edge",
                style: {
                    "curve-style": "bezier",
                    "target-arrow-shape": "triangle"
                }
            }
        ],
        layout: {
            name: "preset"
        },
        ...data
    });

    /// Update titles
    cy.nodes().forEach(ele => {
        const div = document.createElement("div");
        div.innerHTML = ele.data("title");
        MathJax.typeset([div]);
        ele.data("title", div.textContent);
    });

    if (selectCallback) cy.on("select", "node", selectCallback);
    return cy;
}

function getGraphDataUrl(): string {
    const hash = window.location.hash.slice(1);
    if (!hash) return "graph/data.json";
    if (hash.startsWith("tags/")) return `graph/tag/${hash.slice(5)}.json`;
    if (Number.isInteger(Number(hash))) return `graph/note/${hash}.json`;
    return "graph/data.json";
}

function createDialogLabel(title: string, id: number, callback?: ()=> void): HTMLSpanElement {
    const span = document.createElement("span");
    span.slot = "label";
    span.innerHTML = `${title} [<a href="#${id}">${id}</a>]`;

    if (callback) {
        const a = span.querySelector("a") as HTMLAnchorElement;
        a.addEventListener("click", callback);
    }
    return span;
}

function initGraphButton(button: HTMLButtonElement) {
    const [dialog, rename] = createGraphDialog();
    button.insertAdjacentElement("afterend", dialog);
    button.addEventListener("click", async() => {
        dialog.show();

        const container = dialog.querySelector("div")!;
        const cy = createCytoscape(
            container,
            await fetchJson<GraphSchema>(getGraphDataUrl()),
            event => {
                const { title, id } = event.target.data();
                rename(title, id);
            }
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
            renderedPosition: node.renderedPosition()
        });

        window.cy = cy as Core; // expose cy
    });
}

export { initGraphButton };
