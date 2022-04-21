const mongoose = require("mongoose");
const { MONGODB_URI_PROD } = require("./db.config");
// Connect to MongoDB
mongoose
  .connect(MONGODB_URI_PROD, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = require("./src/app");

const port = 3333;
app.listen(port, () => console.log("Server running..."));
