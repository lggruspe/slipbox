require "busted.runner" ()

local model = require "filters/model"

it("alias_parent", function()
  assert.are.equal(model.alias_parent("1a"), "1")
  assert.are.equal(model.alias_parent(nil), nil)
  assert.are_equal(model.alias_parent(""), nil)
  assert.are.equal(model.alias_parent("2"), nil)
end)

it("is_sequence", function()
  assert.truthy(model.is_sequence('1', '1a'))
  assert.truthy(model.is_sequence('2', '2b'))
  assert.truthy(model.is_sequence('3', '3abc'))
  assert.truthy(model.is_sequence(nil, '7'))
  assert.truthy(model.is_sequence(nil, nil))

  assert.truthy(not model.is_sequence('4a', '4b'))
  assert.truthy(not model.is_sequence('5c', '5'))
  assert.truthy(not model.is_sequence('', '6'))
  assert.truthy(not model.is_sequence('', ''))
end)

describe("Database", function()
  local db

  before_each(function()
    db = model.Database:new()
  end)

  describe("add Note", function()
    describe("with invalid note attributes", function()
      it("should raise an error", function()
        assert.truthy(db)
	-- TODO
      end)
    end)
  end)

end)
