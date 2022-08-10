export function on(hash: string, callback: () => void): () => void {
    const listener = () => {
        if (window.location.hash === hash) {
            callback();
        }
    };
    window.addEventListener("DOMContentLoaded", listener);
    window.addEventListener("hashchange", listener);
    return listener;
}

export function off(hash: string, listener: () => void) {
    window.removeEventListener("DOMContentLoaded", listener);
    window.removeEventListener("hashchange", listener);
}

export function initRouter() {
    const goHome = () => window.location.replace("#home");
    on("", goHome);
    on("#", goHome);
}
