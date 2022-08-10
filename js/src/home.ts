function redirectHome() {
    if (!window.location.hash.slice(1)) {
        window.location.replace("#home");
    }
}

export function init() {
    window.addEventListener("DOMContentLoaded", redirectHome);
    window.addEventListener("hashchange", redirectHome);
}
