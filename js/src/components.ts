import "@shoelace-style/shoelace/dist/components/dialog/dialog.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import "./index.css";

import "./icons.js";
import * as router from "./router.js";
import { createSearchSection } from "./search.js";

type Icon = {
    library: string;
    name: string;
};

function tooltip(title: string, external: boolean): HTMLElement {
    const elem = document.createElement("sl-tooltip");
    const icon = "<sl-icon library=\"boxicons\" name=\"bx-link-external\"></sl-icon>";
    elem.innerHTML = `<div slot="content">${title} ${external ? icon : ""}</div>`;
    return elem;
}

function parseIcon(icon: string): Icon | null {
    const parts = icon.split("/");
    if (parts.length < 2) {
        return null;
    }
    const library = parts[0];
    const name = parts.slice(1).join("");
    return { library, name };
}

function iconButton(icon: Icon, href: string | null): SlIconButton {
    const btn = document.createElement("sl-icon-button");
    btn.style.fontSize = "1.25rem";
    btn.library = icon.library;
    btn.name = icon.name;
    if (href != null) {
        btn.href = href;
    }
    return btn;
}

function navItem(tooltip: HTMLElement, iconButton: SlIconButton): HTMLElement {
    tooltip.append(iconButton);
    return tooltip;
}

customElements.define("sb-nav-item", class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const title = this.getAttribute("title") || "";
        const external = this.getAttribute("external") != null;

        const href = this.getAttribute("href");
        const icon = parseIcon(this.getAttribute("icon") || "");
        if (icon == null) {
            throw new Error("sb-nav-item: invalid icon");
        }

        const child = navItem(
            tooltip(title, external),
            iconButton(icon, href)
        );
        this.shadowRoot!.append(child);
    }
});

export class SearchSection extends HTMLElement {
    constructor() {
        super();
        const [section, autoFocus] = createSearchSection();
        this.append(section);
        router.on("#search", autoFocus);
    }
}

customElements.define("sb-search-section", SearchSection);
