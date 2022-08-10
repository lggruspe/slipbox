import "./search.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.js";

import { Index, Tokenizer } from "flexsearch";

import { createBoxicon } from "./icons.js";

function indexNotes(): Index {
    const options = { tokenize: "forward" as Tokenizer };
    const index = new Index(options);
    const notes = Array.from(document.getElementsByClassName("slipbox-note"));
    for (const note of notes) {
        index.add(Number(note.id), note.textContent || "");
    }
    return index;
}

function createSearchInput(index: Index, render: (results: number[]) => void): SlInput {
    const input = document.createElement("sl-input");
    input.size = "small";
    input.pill = true;
    input.placeholder = "Search notes";
    input.clearable = true;

    input.addEventListener("sl-input", () => {
        try {
            const results = input.value === "" ? [] : index.search(input.value);
            render(results as number[]);
        } catch (e) {
            // ignore error when typing ~
        }
    });

    const icon = createBoxicon("bx-search");
    icon.slot = "prefix";

    input.appendChild(icon);
    return input;
}

export function findNote(id: number): HTMLElement | null {
    return document.getElementById(String(id));
}

export function getTitle(note: HTMLElement) {
    const html = note.querySelector("h1")?.innerHTML;
    if (html == null || html === "") {
        return null;
    }

    const a = document.createElement("a");
    a.href = `#${note.id}`;
    a.innerHTML = html;

    const h3 = document.createElement("h3");
    h3.appendChild(a);
    return h3;
}

export function summarize(note: HTMLElement): DocumentFragment | null {
    const title = getTitle(note);
    if (title == null) {
        return null;
    }

    const fragment = document.createDocumentFragment();
    fragment.appendChild(title);

    const p = note.querySelector("p");
    if (p != null) {
        fragment.appendChild(p.cloneNode(true));
    }
    return fragment;
}

// May return undefined if can't create summary.
// id refers to the note ID (also the element ID).
function createResultSummary(id: number): HTMLDivElement | null {
    const note = findNote(id);
    if (note == null) {
        return null;
    }

    const summary = summarize(note);
    if (summary == null) {
        return null;
    }

    const div = document.createElement("div");
    div.classList.add("search-result");
    div.appendChild(summary);
    return div;
}

function createResultsList(results: number[]): HTMLDivElement {
    const div = document.createElement("div");
    for (const result of results) {
        const item = createResultSummary(result);
        if (item != null) {
            div.appendChild(item);
        }
    }
    return div;
}

// Also returns hook for focusing input.
export function createSearchSection(): [HTMLElement, () => void] {
    let results = createResultsList([]);

    const index = indexNotes();
    const render = (rs: number[]) => {
        const replacement = createResultsList(rs);
        results.replaceWith(replacement);
        results = replacement;
    };
    const input = createSearchInput(index, render);

    const section = document.createElement("section");
    section.id = "search";
    section.classList.add("level1");
    section.title = "Search notes";
    section.append(input, results);
    return [section, () => input.focus()];
}
