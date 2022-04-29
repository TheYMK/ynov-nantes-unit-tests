const request = require('supertest');
const app = require('../app');

describe("Integration Tests", () => {
  describe("GET /todo", () => {

    it('It should respond with 200 status code', async () => {
      await request(app).get('/todo').expect(200);
    })

  });
  describe("POST /todo", () => {

    let response;
    let data = {};
    beforeAll(async () => {
      data.text = "Integration";
      response = await request(app).post("/todo").send(data);
    })

    it('It should respond with 201 status code', () => {
      expect(response.statusCode).toBe(201);
    })

    it('It should return a json with the new task', () => {
      expect(response.body.text).toBe(data.text);
    })

  });
  describe("PATCH /todo/:id", () => {

    let response;
    let data = updateData = {};
    beforeAll(async () => {
      data.text = "Integration";
      response = await request(app).post("/todo").send(data);
      updatedResponse = await request(app).patch("/todo/" + response.body._id);

    })

    it('It should respond with 204 status code', () => {
      expect(updatedResponse.statusCode).toBe(200);
    })

    it('It should return a json with the task\'s done value to true ', () => {
      expect(updatedResponse.body.done).toBe(true);
    })


  });
  describe("DELETE /todo/:id", () => {

    let response;
    let data = updateData = {};
    beforeAll(async () => {
      data.text = "Integration";
      response = await request(app).post("/todo").send(data);

    })

    it('It should respond with 204 status code', async () => {
      await request(app).delete("/todo/" + response.body._id).expect(204);
    })


  })
})