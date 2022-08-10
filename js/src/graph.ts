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

function connectGraphDialogAndButton(button: HTMLButtonElement, dialog: SlDialog) {
    button.addEventListener("click", async() => {
        dialog.show();

        const container = dialog.querySelector("div")!;
        const cy = createCytoscape(
            container,
            await fetchJson<GraphSchema>(getGraphDataUrl()),
            event => {
                const { title, id } = event.target!.data();
                const span = document.createElement("span");
                span.slot = "label";
                span.innerHTML = `${title} [<a href="#${id}">${id}</a>]`;
                span.querySelector("a")!.onclick = () => {
                    dialog.hide();
                    return window.location.hash.slice(1) !== id;
                };

                dialog.querySelector("span[slot=\"label\"]")!.replaceWith(span);
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

export { connectGraphDialogAndButton };
