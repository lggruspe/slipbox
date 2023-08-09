// Test src/route.ts.

import { getRoute } from "../src/route";

import fc from "fast-check";

import { strict as assert } from "assert";

describe("getRoute", () => {
  it("home route", () => {
    assert.equal("home", getRoute("").type);
    assert.equal("home", getRoute("#").type);
    assert.equal("home", getRoute("#home").type);
  });

  it("random route", () => {
    const route = { type: "random", hash: "#random" };
    assert.deepEqual(route, getRoute("#random"));
  });

  it("reference list route", () => {
    const route = { type: "reference-list", hash: "#references" };
    assert.deepEqual(route, getRoute("#references"));
  });

  it("search route", () => {
    const route = { type: "search", hash: "#search" };
    assert.deepEqual(route, getRoute("#search"));
  });

  it("tag list route", () => {
    const route = { type: "tag-list", hash: "#tags" };
    assert.deepEqual(route, getRoute("#tags"));
  });

  it("note route", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0 }), (int) => {
        const hash = `#${int}`;
        const route = { type: "note", note: int, hash };
        assert.deepEqual(route, getRoute(hash));
      }),
    );
  });

  it("reference route", () => {
    fc.assert(
      fc.property(fc.webFragments(), (fragment) => {
        const hash = `#ref-${fragment}`;
        const route = { type: "reference", reference: fragment, hash };
        assert.deepEqual(route, getRoute(hash));
      }),
    );
  });

  it("tag route", () => {
    const fragments = fc.webFragments().filter((fragment) => {
      return (
        fragment !== "" &&
        !/^[0-9]/.test(fragment) &&
        !fragment.startsWith("ref-")
      );
    });

    fc.assert(
      fc.property(fragments, (fragment) => {
        const hash = `#${fragment}`;
        const route = { type: "tag", tag: hash, hash };
        assert.deepEqual(route, getRoute(hash));
      }),
    );
  });
});
