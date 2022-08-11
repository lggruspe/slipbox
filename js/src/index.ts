import cytoscape from "cytoscape";

import { initGraphButton } from "./graph.js";
import { initRouter } from "./router.js";
import { GraphSchema } from "./schema.js";
import { initShuffleButton } from "./shuffle.js";
import { fetchJson } from "./utils.js";

import "./components.js";

window.addEventListener("DOMContentLoaded", async() => {
    const data = await fetchJson<GraphSchema>("graph/data.json");

    const title = document.getElementById("title-block-header");
    if (title) title.remove();

    const graphBtn = document.querySelector("sb-icon-button[title=\"Graph\"]");
    initGraphButton(graphBtn as HTMLButtonElement);
    initShuffleButton(cytoscape({ headless: true, ...data }));
});

initRouter();
