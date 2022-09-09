export type RouterCallback = (oldHash?: string) => void;

function createStringListener(hash: string, callback: RouterCallback): (event: Event) => void {
    return (event: Event) => {
        if (window.location.hash === hash) {
            if (event instanceof HashChangeEvent) {
                const url = new URL(event.oldURL);
                callback(url.hash);
            } else {
                callback();
            }
        }
    };
}

function createPatternListener(pattern: RegExp, callback: RouterCallback): (event: Event) => void {
    return (event: Event) => {
        if (pattern.test(window.location.hash)) {
            if (event instanceof HashChangeEvent) {
                const url = new URL(event.oldURL);
                callback(url.hash);
            } else {
                callback();
            }
        }
    };
}

export function on(hash: string | RegExp, callback: RouterCallback): (event: Event) => void {
    const listener = hash instanceof RegExp
        ? createPatternListener(hash, callback)
        : createStringListener(hash, callback);
    window.addEventListener("DOMContentLoaded", listener);
    window.addEventListener("hashchange", listener);
    return listener;
}

export function off(hash: string, listener: (event: Event) => void) {
    window.removeEventListener("DOMContentLoaded", listener);
    window.removeEventListener("hashchange", listener);
}

export function initRouter() {
    const goHome = () => window.location.replace("#home");
    on("", goHome);
    on("#", goHome);
}
