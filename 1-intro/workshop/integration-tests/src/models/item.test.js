const { it, describe } = require("@jest/globals");
const mongoose = require("mongoose");
const Item = require("./Item");

jest.setTimeout(30000);

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/docker-node-mongo", {
  useNewUrlParser: true,
});

const itemMock = new Item({
  name: "Mocked item",
});

describe("ITEM MODEL", () => {
  /* ADD ITEM */
  describe("Add item", () => {
    it("should create the item", async () => {
      const itemCreated = await Item.create(itemMock);
      expect(itemCreated.name).toBe(itemMock.name);
      expect(itemCreated._id).toBeDefined();
      expect(itemCreated.date).toBeDefined();
    });

    it("should throw an error if the item is not valid", async () => {
      const item = new Item({ name: "Mocked item 2" });
      item.name = "";

      try {
        await Item.create(item);
      } catch (error) {
        expect(error.message).toBe(
          "item validation failed: name: Path `name` is required."
        );
      }
    });
  });

  /* GET ITEM */
  describe("Get item", () => {
    it("should return the item when searching by name", async () => {
      const itemFinded = await Item.findOne({ name: itemMock.name });
      expect(itemFinded.name).toBe(itemMock.name);
    });

    it("should return items when searching by name", async () => {
      const itemsFinded = await Item.find({ name: itemMock.name });
      expect(itemsFinded.length >= 0).toBeTruthy();
      expect(itemsFinded[0].name).toBe(itemMock.name);
    });

    it("should return an empty array if the item is not found", async () => {
      const itemFinded = await Item.find({ name: "Imaginary item" });
      expect(itemFinded.length).toBe(0);
    });
  });

  /* UPDATE ITEM */
  describe("Update item", () => {
    it("should update the item", async () => {
      const itemFinded = await Item.findOne({ name: itemMock.name });
      itemFinded.name = "Mocked item updated";
      const itemUpdated = await itemFinded.save();
      expect(itemUpdated.name).toBe("Mocked item updated");
    });

    it("should throw an error if the item is not valid", async () => {
      const itemFinded = await Item.findOne({ name: itemMock.name });
      itemFinded.name = "";
      try {
        await itemFinded.save();
      } catch (error) {
        expect(error.message).toBe(
          "item validation failed: name: Path `name` is required."
        );
      }
    });
  });

  /* DELETE ITEM */
  describe("Delete item", () => {
    it("should delete the item", async () => {
      const itemDeleted = await Item.deleteOne({ name: itemMock.name });
      expect(itemDeleted.deletedCount).toBe(1);
      expect(itemDeleted.ok).toBe(1);
    });
  });
});
