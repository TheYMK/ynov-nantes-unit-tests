const { it, describe } = require("@jest/globals");
const mongoose = require("mongoose");
const { MONGODB_URI_DEV } = require("../db.config");
const Item = require("./models/Item");
const axios = require("axios");

jest.setTimeout(30000);

const itemMock = new Item({
  name: "Mocked item",
});

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI_DEV, {
    useNewUrlParser: true,
  })
  .catch(() => console.log("\x1b[31m%s\x1b[0m", "MongoDB connection error"));

describe("APP", () => {
  it("will be defined later", () => {
    expect(true).toBe(true);
  });
});
