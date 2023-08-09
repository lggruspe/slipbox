// Test src/router2.ts.

import { Router } from "../src/router2";

import { strict as assert } from "assert";

describe("Router", () => {
  describe("with no callbacks", () => {
    it("should run just fine", () => {
      const router = new Router();
      router.visit({ type: "home", hash: "" });
    });
  });

  describe("with global callbacks", () => {
    it("should run the callbacks on any route", () => {
      const router = new Router();

      let ok = false;
      router.on([], () => {
        ok = true;
      });

      assert.ok(!ok);
      router.visit({ type: "home", hash: "" });
      assert.ok(ok);
    });
  });

  describe("with route-specific callbacks", () => {
    it("should run when route matches", () => {
      const router = new Router();

      let ok = false;
      router.on("home", () => {
        ok = true;
      });

      assert.ok(!ok);
      router.visit({ type: "home", hash: "" });
      assert.ok(ok);
    });

    it("should not run when route does not match", () => {
      const router = new Router();

      let ok = true;
      router.on("home", () => {
        ok = false;
      });

      router.visit({ type: "tag-list", hash: "" });
      assert.ok(ok);
    });
  });

  describe("with multiple routes", () => {
    it("should trigger callback when any route matches", () => {
      const router = new Router();

      let ok = false;
      router.on(["tag-list", "reference-list"], () => {
        ok = true;
      });

      assert.ok(!ok);
      router.visit({ type: "tag-list", hash: "" });
      assert.ok(ok);
    });

    it("should not trigger callback if none of the routes match", () => {
      const router = new Router();

      let ok = true;
      router.on(["tag-list", "reference-list"], () => {
        ok = false;
      });

      router.visit({ type: "home", hash: "" });
      assert.ok(ok);
    });
  });

  describe("callback execution order", () => {
    it("should run route-specific callbacks first", () => {
      const router = new Router();

      const result: number[] = [];
      router.on([], () => result.push(2));
      router.on("home", () => result.push(1));

      assert.deepEqual(result, []);
      router.visit({ type: "home", hash: "" });
      assert.deepEqual(result, [1, 2]);
    });

    it("should run same-type callbacks in the order they were added", () => {
      const router = new Router();

      const result: number[] = [];
      router.on("home", () => result.push(1));
      router.on("home", () => result.push(2));

      assert.deepEqual(result, []);
      router.visit({ type: "home", hash: "" });
      assert.deepEqual(result, [1, 2]);
    });
  });
});
