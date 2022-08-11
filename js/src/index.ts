import cytoscape from "cytoscape";

import * as graph from "./graph.js";

import { initRouter } from "./router.js";
import { GraphSchema } from "./schema.js";
import { initShuffleButton } from "./shuffle.js";
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
    initShuffleButton(cytoscape({ headless: true, ...data }));
});

initRouter();
