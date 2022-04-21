const { it, describe } = require("@jest/globals");
const ItemService = require("./itemService");
const mongoose = require("mongoose");

jest.setTimeout(30000);

const itemMock = new Item({
  name: "Mocked item",
});

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/docker-node-mongo", {
  useNewUrlParser: true,
});

describe("ITEM SERVICE", () => {
  /* GET ITEM */
  describe("Get item", () => {
    it("should return the mocked item", () => {
      const itemName = "Mocked item";
      expect(itemMock.name).toBe(itemName);
    });

    it("should return the mocked item", () => {
      expect(itemMock.name).toBe("Mocked item");
    });
  });

  /* CREATE ITEM */
  describe("Create item", () => {
    it("should create & return the created item", async () => {
      const item = new Item({ name: "Mocked item 2" });
      const itemCreated = await ItemService.createItem(item);

      expect(itemCreated.name).toBe("Mocked item 2");
      expect(itemCreated._id).toBeDefined();
      expect(itemCreated.date).toBeDefined();
    });

    it("should throw an error if the item is not valid", async () => {
      const item = new Item({ name: "Mocked item 2" });
      item.name = "";

      try {
        await ItemService.createItem(item);
      } catch (error) {
        expect(error.message).toBe("No name provided in the body");
      }
    });
  });
});
