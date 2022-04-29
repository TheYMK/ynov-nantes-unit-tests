
const todoController = require('../controllers/todo.controller');

module.exports = (app) => {

    /**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - text
 *         - done
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated ID of the todo
 *         text:
 *           type: string
 *           description: The content of the todo.
 *         done:
 *           type: boolean
 *           description: Whether the todo is done or not.
 *       example:
 *          text: "Hey this is a todo"
 *          done: false
 */

    /**
     * @swagger
     * tags:
     *  name: Todo
     *  description: API to manage todos.
     */

    /**
     * @swagger
     * path:
     * /todo:
     *   get:
     *    summary: Fetches all todos
     *    tags: [Todo]
     *    responses:
     *      "200":
     *        description: Returns all todos.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Todo'
     */
    app.get('/todo', todoController.getTodos);
    /**
     * @swagger
     * path:
     * /post:
     *   post:
     *    summary: Creates a new todo
     *    tags: [Todo]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Todo'
     *    responses:
     *      "201":
     *        description: Returns the created todo.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Todo'
     *      "400":
     *         description: Returns an error message.
     */
    app.post('/todo', todoController.createTodo);

    /**
     * @swagger
     * path:
     * /todo/{id}:
     *   patch:
     *    summary: Updates an existing todo
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: The ID of the todo
     *    tags: [Todo]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Todo'
     *    responses:
     *      "200":
     *        description: Returns the updated todo.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Todo'
     *      "400":
     *        description: Returns an error message.
     */
    app.patch('/todo/:id', todoController.patchTodo);
    /**
     * @swagger
     * path:
     * /todo/{id}:
     *   delete:
     *    summary: Delete an existing todo
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        description: The ID of the todo
     *    tags: [Todo]
     *    responses:
     *      "204":
     *        description: Returns the deleted todo.
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Todo'
     *      "400":
     *         description: Returns an error message.
     */
    app.delete('/todo/:id', todoController.deleteTodo);
}