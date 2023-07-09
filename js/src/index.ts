import cytoscape from "cytoscape";

import { initGraphButton } from "./graph.js";
import { initRouter } from "./router.js";
import { GraphSchema } from "./schema.js";
import { initShuffleButton } from "./shuffle.js";
import { fetchJson } from "./utils.js";

import "./components.js";

const data = fetchJson<GraphSchema>("graph/data.json");

window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("title-block-header")?.remove();

  const graphBtn = document.querySelector('sb-icon-button[title="Graph"]');
  initGraphButton(graphBtn as HTMLButtonElement);
  initShuffleButton(cytoscape({ headless: true, ...(await data) }));
});

initRouter();
