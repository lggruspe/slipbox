import cytoscape from "cytoscape";

import * as graph from "./graph.js";
import * as home from "./home.js";
import * as shuffle from "./shuffle.js";

import { GraphSchema } from "./schema.js";
import { fetchJson } from "./utils.js";

import "./components.js";

window.addEventListener("DOMContentLoaded", async() => {
    const data = await fetchJson<GraphSchema>("graph/data.json");

    const title = document.getElementById("title-block-header");
    if (title) title.remove();

    graph.connectGraphDialogAndButton(
        document.querySelector("sl-icon-button[name=\"bx-network-chart\"]")!,
        document.querySelector("#slipbox-graph-dialog")!
    );
    shuffle.registerShuffleButton(
        cytoscape({ headless: true, ...data }),
        document.querySelector("sb-nav-item[title=\"Random note\"]")!
    );
});

home.init();
