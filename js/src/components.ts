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

export class IconButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const href = this.getAttribute("href");
        const icon = parseIcon(this.getAttribute("icon") || "");
        if (icon == null) {
            throw new Error("sb-icon-button: invalid icon");
        }
        shadowRoot.append(iconButton(icon, href));
    }
}

export class SearchSection extends HTMLElement {
    constructor() {
        super();
        const [section, autoFocus] = createSearchSection();
        this.append(section);
        router.on("#search", autoFocus);
    }
}

customElements.define("sb-icon-button", IconButton);
customElements.define("sb-search-section", SearchSection);
