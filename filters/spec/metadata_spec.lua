local metadata = require "src.metadata"

describe("parse", function()
  describe("with invalid header", function()
    --- NOTE header ends with \n
    it("should return false", function()
      assert.falsy(metadata.parse "")
      assert.falsy(metadata.parse "[metadata]")
      assert.falsy(metadata.parse "[slipbox-metadata]")
    end)
  end)

  describe("with valid header", function()
    describe("with empty body", function()
      it("should return true and empty table", function()
        local ok, result = metadata.parse "[slipbox-metadata]\n"
        assert.truthy(ok)
        assert.same(result, {})
      end)
    end)

    describe("with key-value pairs", function()
      it("should return true and table containing those pairs", function()
        local ok, result = metadata.parse [[[slipbox-metadata]
key1=val1
key2 = val2]]
        assert.truthy(ok)
        assert.truthy(result)
        assert.equal(result.key1, "val1")
        assert.equal(result.key2, "val2")
      end)

      it("should work with any number of newlines after the body", function()
        local ok, result = metadata.parse [[[slipbox-metadata]
key1=val1
key2 = val2


]]
        assert.truthy(ok)
        assert.truthy(result)
        assert.equal(result.key1, "val1")
        assert.equal(result.key2, "val2")
      end)
    end)

    describe("with invalid body", function()
      it("should return false", function()
        assert.falsy(metadata.parse "[slipbox-metadata]\nkey")
        assert.falsy(metadata.parse "[slipbox-metadata]\nkey1=val1\nkey\nkey2=val2")
      end)
    end)
  end)
end)
