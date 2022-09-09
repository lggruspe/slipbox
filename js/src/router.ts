export type RouterCallback = (oldHash?: string) => void;

const routes: Array<[string | RegExp, RouterCallback]> = [];

function resolveRoute(hash: string): RouterCallback {
    const callbacks: RouterCallback[] = [];

    for (const [route, callback] of routes) {
        const ok = route instanceof RegExp ? route.test(hash) : route === hash;
        if (ok) {
            callbacks.push(callback);
        }
    }
    return (oldHash?: string) => {
        for (const callback of callbacks) {
            callback(oldHash);
        }
    };
}

function listen(event: Event): void {
    const callback = resolveRoute(window.location.hash);
    if (event instanceof HashChangeEvent) {
        const url = new URL(event.oldURL);
        callback(url.hash);
    } else {
        callback();
    }
}

export function on(hash: string | RegExp, callback: RouterCallback): void {
    routes.push([hash, callback]);
}

export function initRouter() {
    window.addEventListener("DOMContentLoaded", listen);
    window.addEventListener("hashchange", listen);

    const goHome = () => window.location.replace("#home");
    on("", goHome);
    on("#", goHome);
}
