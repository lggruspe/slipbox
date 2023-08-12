import cytoscape from "cytoscape";

import { initGraphButton } from "./graph.js";
import { randomChoice } from "./random";
import { globalRouter } from "./router";
import { GraphSchema } from "./schema.js";
import { fetchJson } from "./utils.js";

import "./components.js";

function initRouter() {
  globalRouter.on("home", (newRoute) => {
    if (newRoute.hash !== "#home") {
      window.location.replace("#home");
    }
  });

  globalRouter.on([], () => window.scrollTo(0, 0));
  globalRouter.register();
}

function initShuffleButton(cy: cytoscape.Core) {
  globalRouter.on("random", () => {
    const choice = randomChoice(cy.nodes());
    const path = "#" + (choice?.data("path") || "");
    window.location.replace(path);
  });
}

const data = fetchJson<GraphSchema>("graph/notes.json");

window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("title-block-header")?.remove();

  const graphBtn = document.querySelector('sb-icon-button[title="Graph"]');
  initGraphButton(graphBtn as HTMLButtonElement);
  initShuffleButton(cytoscape({ headless: true, ...(await data) }));
});

initRouter();
