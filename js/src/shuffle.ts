import { Core, NodeCollection, NodeSingular } from "cytoscape";

import { globalRouter } from "./router";

function randomChoice(choices: NodeCollection): NodeSingular | undefined {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

/// Return note ID of random outgoer or root.
function shuffle(cy: Core, hash: string): number {
  const id = hash.slice(1);
  if (id && Number.isInteger(Number(id))) {
    const outgoers = cy.$(`#${id}`).outgoers().nodes();
    if (outgoers.length > 0) {
      const node = randomChoice(outgoers) as NodeSingular;
      return node.data("id");
    }
  }
  return randomChoice(cy.nodes().roots())?.data("id");
}

export function initShuffleButton(cy: Core) {
  globalRouter.on("random", (_, oldRoute) => {
    const oldHash = oldRoute?.hash || "";
    const next = shuffle(cy, oldHash);
    window.location.replace(`#${next}`);
  });
}
