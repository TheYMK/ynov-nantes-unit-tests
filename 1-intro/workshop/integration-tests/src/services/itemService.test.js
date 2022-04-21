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
  /* ADD ITEM */
  describe("Add item", () => {
    it("should create the item", async () => {
      const itemCreated = await ItemService.createItem(itemMock);
      expect(itemCreated.name).toBe(itemMock.name);
      expect(itemCreated._id).toBeDefined();
      expect(itemCreated.date).toBeDefined();
    });

    it("should throw an error if the item is not valid", async () => {
      const item = new Item({ name: "Will fail" });
      item.name = "";

      try {
        await ItemService.createItem(item);
      } catch (error) {
        expect(error.message).toBe("No name provided in the body");
      }
    });
  });

  /* GET ITEM */
  describe("Get item", () => {
    it("should return items", async () => {
      const itemsFinded = await ItemService.listItems();
      expect(itemsFinded.length >= 0).toBeTruthy();
      expect(itemsFinded[0] instanceof Item).toBeTruthy();
    });
  });
});
