import { Core, NodeCollection, NodeSingular } from "cytoscape";

import * as router from "./router.js";

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
    router.on("#random", (oldHash?: string) => {
        const next = shuffle(cy, oldHash || "");
        window.location.replace(`#${next}`);
    });
}
