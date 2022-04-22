const { Shop, Item } = require("../src/gilded_rose");

// name, sellIn, quality
const itemMock = (...params) => new Item(...params);

describe("Gilded Rose", function () {
  // Tous les éléments ont une valeur sellIn qui désigne le nombre de jours restant pour vendre l'article.
  describe("Every item must have a sellIn value", () => {
    it("should have a valid sellIn value", () => {
      const items = [itemMock("foo", 0, 0), itemMock("bar", 0, 0)];
      const shop = new Shop(items);
      shop.items.forEach((itemShop) => {
        expect(itemShop.sellIn).toBeDefined();
        expect(typeof itemShop.sellIn).toBe("number");
        expect(itemShop.sellIn).toBeGreaterThanOrEqual(0);
      });
    });

    it("should throw an error if sellIn is not defined", () => {
      try {
        itemMock("foo", undefined, 0);
      } catch ({ message }) {
        expect(message).toBe("sellIn must be defined as a number");
      }
    });

    it("should throw an error if sellIn is not a positive number", () => {
      try {
        itemMock("foo", -1, 0);
      } catch ({ message }) {
        expect(message).toBe("sellIn must be greater than or equal to 0");
      }
    });

    it("should throw an error if sellIn is not a positive integer", () => {
      try {
        itemMock("foo", 1.5, 0);
      } catch ({ message }) {
        expect(message).toBe("sellIn must be a positive integer");
      }
    });
  });

  /* it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  }); */
});
