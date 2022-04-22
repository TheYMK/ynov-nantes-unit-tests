const { Shop, Item } = require("../src/gilded_rose");

// name, sellIn, quality
const itemMock = (...params) => new Item(...params);

describe("Gilded Rose", function () {
  // Tous les éléments ont une valeur sellIn qui désigne le nombre de jours restant pour vendre l'article.
  describe("Every item's sellIn ", () => {
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

    it("should throw an error if sellIn is not a integer", () => {
      try {
        itemMock("foo", 1.5, 0);
      } catch ({ message }) {
        expect(message).toBe("sellIn must be a integer");
      }
    });
  });

  // Tous les articles ont une valeur quality qui dénote combien l'article est précieux.
  describe("every item's quality ", () => {
    it("should have a valid quality value", () => {
      const items = [itemMock("foo", 0, 0), itemMock("bar", 0, 0)];
      const shop = new Shop(items);
      shop.items.forEach((itemShop) => {
        expect(itemShop.quality).toBeDefined();
        expect(typeof itemShop.quality).toBe("number");
        expect(itemShop.quality).toBeGreaterThanOrEqual(0);
      });
    });

    it("should throw an error if quality is not defined", () => {
      try {
        itemMock("foo", 0, undefined);
      } catch ({ message }) {
        expect(message).toBe("quality must be defined as a number");
      }
    });

    it("should throw an error if quality is not a integer", () => {
      try {
        itemMock("foo", 0, 1.5);
      } catch ({ message }) {
        expect(message).toBe("quality must be a integer");
      }
    });

    it("should throw an error if quality is less than 0", () => {
      try {
        itemMock("foo", 0, -1);
      } catch ({ message }) {
        expect(message).toBe("quality must be greater than 0");
      }
    });

    it("should throw an error if quality is greater than 50", () => {
      try {
        itemMock("foo", 0, 51);
      } catch ({ message }) {
        expect(message).toBe("quality must be less than 50");
      }
    });
  });

  // À la fin de chaque journée, notre système diminue ces deux valeurs pour chaque produit
  it("Checks if at the end of the day quality and sellIn value are decreased", () => {
    const gildedRose = new Shop([itemMock("foo", 10, 20)]);
    const days = Number(process.argv[2]) || 2;
    let items = [];
    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      items = gildedRose.updateQuality();
    }
    expect(items[0].quality).toBe(18);
    expect(items[0].sellIn).toBe(8);
  });

  it("Checks if 'Backstage passes', like 'Aged Brie', increases its quality (quality) the more time passes (sellIn); The quality increases by 2 when there are 10 days or less left and by 3 when there are 5 days or less left, but the quality drops to 0 after the concert.", () => {
    const gildedRose = new Shop([
      itemMock("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]);

    const days = Number(process.argv[20]) || 20;
    let items = [];
    let previousQualityValue = 20;

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      items = gildedRose.updateQuality();
      console.log(`${items[0].name}, ${items[0].sellIn}, ${items[0].quality}`);
      if (items[0].sellIn < 10 && items[0].sellIn > 5) {
        expect(items[0].quality).toBe(previousQualityValue + 2);
      } else if (items[0].sellIn < 5 && items[0].sellIn > 0) {
        expect(items[0].quality).toBe(previousQualityValue + 3);
      } else if (items[0].sellIn <= 0) {
        expect(items[0].quality).toBe(0);
      }

      previousQualityValue = items[0].quality;
    }
  });

  it("Checks if 'Sulfuras', being a legendary item, has no expiration date and never loses quality", () => {
    const gildedRose = new Shop([
      itemMock("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);

    const days = Number(process.argv[20]) || 20;
    let items = [];
    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      items = gildedRose.updateQuality();
      console.log(`${items[0].name}, ${items[0].sellIn}, ${items[0].quality}`);
    }

    expect(items[0].quality).toBe(80);
  });

  /* it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  }); */
});
