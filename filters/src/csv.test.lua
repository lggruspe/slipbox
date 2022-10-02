require "busted.runner" ()

local csv = require "src.csv"


describe("Writer", function()
  describe("write", function()
    describe("with wrong number of fields", function()
      it("should throw error", function()
        local w = csv.Writer:new{"foo", "bar"}
        w:write{0, 1}

        assert.falsy(pcall(csv.Writer.write, w, {2, 3, 4}))
        assert.falsy(pcall(csv.Writer.write, w, {5}))
      end)
    end)
  end)
end)
