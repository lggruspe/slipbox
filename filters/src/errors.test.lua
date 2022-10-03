require "busted.runner" ()

local errors = require "src.errors"

describe("duplicate_note_id", function()
  local notes = {
    {title = "Foo", filename = "foo.md"},
    {title = "Bar", filename = "bar.md"},
  }

  describe("with non-number id", function()
    it("should throw error", function()
      assert.falsy(pcall(errors.duplicate_note_id, "5", notes))
    end)
  end)

  describe("with < 2 notes", function()
    it("should throw error", function()
      assert.falsy(pcall(errors.duplicate_note_id, 5, {}))
      assert.falsy(pcall(errors.duplicate_note_id, 5, {notes[1]}))
    end)
  end)

  describe("with >= 2 notes, but with invalid fields", function()
    local invalid_title = {
      {title = "", filename = "foo.md"},
      {title = "bar", filename = "bar.md"},
    }

    local invalid_filename = {
      {title = "Foo", filename = "foo.md"},
      {title = "Bar", filename = ""},
    }
    it("should throw error", function()
      assert.falsy(pcall(errors.duplicate_note_id, 4, invalid_title))
      assert.falsy(pcall(errors.duplicate_note_id, 4, invalid_filename))
    end)
  end)

  describe("message format", function()
    before_each(function()
      errors.duplicate_note_id(0, notes)
    end)

    after_each(function()
      table.remove(errors._messages)
    end)

    it("level = error", function()
      local message = errors._messages[1]
      assert.are.equals(message.level, "error")
    end)

    it("name = duplicate-note-id", function()
      local message = errors._messages[1]
      assert.are.equals(message.name, "duplicate-note-id")
    end)

    it("has necessary info in value", function()
      local message = errors._messages[1]
      local value = message.value
      assert.are.equals(value.id, 0)
      assert.are.equals(#value.notes, #notes)

      for i = 1, #notes do
        assert.are.equals(value.notes[i].title, notes[i].title)
        assert.are.equals(value.notes[i].filename, notes[i].filename)
      end
    end)
  end)
end)

describe("empty_link_target", function()
  describe("with invalid id", function()
    it("should throw error", function()
      local note = {
        id = "0",
        title = "Foo",
        filename = "foo.md",
      }
      assert.falsy(pcall(errors.empty_link_target, note))
    end)
  end)

  describe("with invalid title", function()
    it("should throw error", function()
      local note = {
        id = 0,
        title = "",
        filename = "foo.md",
      }
      assert.falsy(pcall(errors.empty_link_target, note))
    end)
  end)

  describe("with invalid filename", function()
    it("should throw error", function()
      local note = {
        id = 0,
        title = "Foo",
        filename = "",
      }
      assert.falsy(pcall(errors.empty_link_target, note))
    end)
  end)

  describe("message format", function()
    local note = {
      id = 0,
      title = "Foo",
      filename = "foo.md",
    }

    before_each(function()
      errors.empty_link_target(note)
    end)

    after_each(function()
      table.remove(errors._messages)
    end)

    it("level = warning", function()
      local message = errors._messages[1]
      assert.are.equals(message.level, "warning")
    end)

    it("name = empty-link-target", function()
      local message = errors._messages[1]
      assert.are.equals(message.name, "empty-link-target")
    end)

    it("has necessary info in value", function()
      local message = errors._messages[1]
      local value = message.value
      assert.are.equals(value.id, note.id)
      assert.are.equals(value.title, note.title)
      assert.are.equals(value.filename, note.filename)
    end)
  end)
end)
