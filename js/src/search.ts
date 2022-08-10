import flexsearch from "flexsearch";
import { Tokenizer } from "flexsearch";

import SlDialog from "@shoelace-style/shoelace/dist/components/dialog/dialog.js";

/// Takes callback that gets invoked when title gets clicked.
function extractTitle(section: Element, callback: (event: Event) => void) {
    const html = section?.querySelector("h1")?.innerHTML;

    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    h3.appendChild(a);

    a.href = `#${section.id}`;
    a.innerHTML = html || "";

    if (callback) a.onclick = callback;
    return html ? h3 : null;
}

function extractSummary(section: Element, callback: (event: Event) => void) {
    const title = extractTitle(section, callback);
    if (!title) return null;

    const fragment = document.createDocumentFragment();
    fragment.appendChild(title);

    const p = section.querySelector("p");
    if (p) {
        fragment.appendChild(p.cloneNode(true));
    }
    return fragment;
}

function createResultFromSection(section: Element, callback: (event: Event) => void) {
    const summary = extractSummary(section, callback);
    if (!summary) return null;

    const div = document.createElement("div");
    div.appendChild(summary);
    return div;
}

function createSearchIndex(sections: Element[]) {
    const options = { tokenize: "forward" as Tokenizer };
    const index = new flexsearch.Index(options);
    sections.forEach(sec => index.add(Number(sec.id), sec.textContent || ""));
    return index;
}

function init() {
    const sections = Array.from(document.getElementsByClassName("slipbox-note"));
    const index = createSearchIndex(sections);

    const dialog = document.querySelector("#slipbox-search-dialog") as SlDialog;
    const input = dialog.querySelector("sl-input")!;
    const resultsContainer = dialog.querySelector(".slipbox-search-dialog-results")!;

    input.addEventListener("sl-input", () => {
        try {
            const results = input.value === "" ? [] : index.search(input.value);
            resultsContainer.textContent = "";
            for (const result of results) {
                const element = createResultFromSection(
                    document.getElementById(String(result))!,
                    () => dialog.hide()
                );
                if (element) resultsContainer.appendChild(element);
                resultsContainer.appendChild(document.createElement("br"));
            }
        } catch (e) {
            // ignore uncaught error when typing ~
        }
    });

    dialog.addEventListener("sl-initial-focus", event => {
        event.preventDefault();
        input.focus({ preventScroll: true });
    });
}

export { init };
