// Test src/route.ts.

import { getRoute } from "../src/route";

import fc from "fast-check";

import { strict as assert } from "assert";

describe("getRoute", () => {
  it("home route", () => {
    const route = { type: "home" };
    assert.deepEqual(route, getRoute(""));
    assert.deepEqual(route, getRoute("#"));
    assert.deepEqual(route, getRoute("#home"));
  });

  it("random route", () => {
    const route = { type: "random" };
    assert.deepEqual(route, getRoute("#random"));
  });

  it("reference list route", () => {
    const route = { type: "reference-list" };
    assert.deepEqual(route, getRoute("#references"));
  });

  it("search route", () => {
    const route = { type: "search" };
    assert.deepEqual(route, getRoute("#search"));
  });

  it("tag list route", () => {
    const route = { type: "tag-list" };
    assert.deepEqual(route, getRoute("#tags"));
  });

  it("note route", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0 }), (int) => {
        const route = { type: "note", note: int };
        assert.deepEqual(route, getRoute(`#${int}`));
      }),
    );
  });

  it("reference route", () => {
    fc.assert(
      fc.property(fc.webFragments(), (fragment) => {
        const hash = `#ref-${fragment}`;
        const route = { type: "reference", reference: fragment };
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
        const route = { type: "tag", tag: hash };
        assert.deepEqual(route, getRoute(hash));
      }),
    );
  });
});
