import { getRoute, Route } from "./route";

/**
 * Callback function for route changes.
 */
export type RouteCallback = (
  newRoute: Route,
  oldRoute: Route | undefined,
) => void;

/*
 * An object that runs callbacks associated with various pages.
 */
export class Router {
  /**
   * Callbacks to run on every route.
   */
  private afters: RouteCallback[] = [];

  /**
   * Callbacks to run on specific routes.
   */
  private callbacks: Map<string, RouteCallback[]> = new Map();

  /**
   * The previous route.
   * This only keeps track of route changes via `listen()`.
   */
  private previousRoute: Route | undefined = undefined;

  /**
   * Registers callback for the given routes.
   * If the input list of routes is an empty array, registers the callback to
   * run on every route.
   */
  on(routeType: string, callback: RouteCallback): void;
  on(routeTypes: string[], callback: RouteCallback): void;
  on(routes: string | string[], callback: RouteCallback) {
    if (routes instanceof Array) {
      if (routes.length === 0) {
        this.afters.push(callback);
        return;
      }
      for (const route of routes) {
        this.on(route, callback);
      }
      return;
    }

    if (!this.callbacks.has(routes)) {
      this.callbacks.set(routes, []);
    }
    const callbacks = this.callbacks.get(routes) as RouteCallback[];
    callbacks.push(callback);
  }

  /**
   * Runs callbacks associated with the given route.
   */
  visit(route: Route) {
    const prev = this.previousRoute;
    const callbacks = this.callbacks.get(route.type) || [];
    callbacks.forEach((callback) => callback(route, prev));
    this.afters.forEach((callback) => callback(route, prev));

    this.previousRoute = route;
  }

  /**
   * Registers event listeners.
   */
  register() {
    const listen = () => this.visit(getRoute(window.location.hash));

    // TODO What if DOMContentLoaded or hashchange has already fired?
    window.addEventListener("DOMContentLoaded", listen);
    window.addEventListener("hashchange", listen);
  }
}
