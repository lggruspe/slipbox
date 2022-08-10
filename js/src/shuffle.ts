import { Core, NodeCollection, NodeSingular } from "cytoscape";

function randomChoice(choices: NodeCollection): NodeSingular | undefined {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

/// Return note ID of random outgoer or root.
function shuffle(cy: Core): number {
    const id = window.location.hash.slice(1);
    if (id && Number.isInteger(Number(id))) {
        const outgoers = cy.$(`#${id}`).outgoers().nodes();
        if (outgoers.length > 0) {
            return randomChoice(outgoers)!.data("id");
        }
    }
    return randomChoice(cy.nodes().roots())?.data("id");
}

/// Register shuffle button callbacks.
function registerShuffleButton(cy: Core, button: HTMLButtonElement) {
    button.addEventListener("click", () => {
        window.location.hash = `#${shuffle(cy)}`;
    });
}

export { registerShuffleButton };
