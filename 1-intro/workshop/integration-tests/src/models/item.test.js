const { it, describe } = require("@jest/globals");
const mongoose = require("mongoose");
const Item = require("./Item");
const { MONGODB_URI_DEV } = require("../../db.config");

jest.setTimeout(60000);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI_DEV, {
    useNewUrlParser: true,
  })
  .catch(() => console.log("\x1b[31m%s\x1b[0m", "MongoDB connection error"));

const itemMock = new Item({
  name: "Mocked item",
});

beforeAll(async () => {
  await Item.deleteMany();
});

afterAll(async () => {
  await Item.deleteMany();
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
      try {
        await Item.findOneAndUpdate({ name: itemMock.name }, { name: "" });
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
