const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();


// ============================================================
//                   Swagger config
// ============================================================
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TODO API",
      version: "1.0.0",
      description: "by KAYM Kassai (kassai.kaym@ynov.com) || KOTTO Yann (yann.kotto@ynov.com) || OUVRARD Lilian (lilian.ouvrard@ynov.com)",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Kaym Kassai",
        url: "https://kaymkassai.com",
        email: "kassai.kaym@ynov.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5002",
      },
    ],
  },
  apis: ["./routes/todo.routes.js"],
};

const specs = swaggerJsdoc(options);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

require('./routes/todo.routes.js')(app);

module.exports = app;