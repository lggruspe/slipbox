import { globalRouter } from "./router";

/**
 * Returns a random node from the collection, or `undefined` if the collection
 * is empty.
 */
export function randomChoice(
  choices: cytoscape.NodeCollection,
): cytoscape.NodeSingular | undefined {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

/// Return note ID of random outgoer or root.
function shuffle(cy: cytoscape.Core, hash: string): number {
  const id = hash.slice(1);
  if (id && Number.isInteger(Number(id))) {
    const outgoers = cy.$(`#${id}`).outgoers().nodes();
    if (outgoers.length > 0) {
      const node = randomChoice(outgoers) as cytoscape.NodeSingular;
      return node.data("id");
    }
  }
  return randomChoice(cy.nodes().roots())?.data("id");
}

export function initShuffleButton(cy: cytoscape.Core) {
  globalRouter.on("random", (_, oldRoute) => {
    const oldHash = oldRoute?.hash || "";
    const next = shuffle(cy, oldHash);
    window.location.replace(`#${next}`);
  });
}
