// Test src/shuffle.ts.

import { randomChoice } from "../src/shuffle";

import fc from "fast-check";

import { strict as assert } from "assert";

describe("randomChoice", () => {
  describe("with empty input", () => {
    it("should return `undefined`", () => {
      assert.equal(undefined, randomChoice([]));
    });
  });

  describe("with non-empty input", () => {
    it("should return one of the inputs", () => {
      fc.assert(
        fc.property(fc.array(fc.anything(), { minLength: 1 }), (choices) => {
          const choice = randomChoice(choices);
          assert.ok(choices.includes(choice));
        }),
      );
    });
  });
});
