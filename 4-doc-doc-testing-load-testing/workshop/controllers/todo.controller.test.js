const toDoController = require('./todo.controller');
const { mockRequest, mockResponse } = require('../utils/interceptor');
const { ToDo } = require('../models/todo.model.js');

describe('Todo Controller', () => {

    describe('Get all todos', () => {
        it('should return an array of todos', () => {
            const req = mockRequest();
            const res = mockResponse();
            
            toDoController.getTodos(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should throw an error an error occurs', () => {
            const error = new Error('Error');
            jest.spyOn(ToDo, 'find').mockRejectedValueOnce(error);

            const req = mockRequest();
            const res = mockResponse();

            toDoController.getTodos(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    })

    describe('Create a todo', () => {
        it('should return a todo', () => {
            const todoBody = {
            text: 'Test todo',
            done:false
        }

            let req = mockRequest(todoBody);
            req.body = todoBody;
            const res = mockResponse();

            toDoController.createTodo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        })

        it('should throw an error an error occurs', () => {
            const req = mockRequest();
            const res = mockResponse();

            toDoController.createTodo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        })
    })

    describe('Patch a todo', () => {
        it('should patch a todo', () => {
            jest.spyOn(ToDo, 'findOneAndUpdate').mockResolvedValueOnce({_id: 1, text: 'Test todo', done: true});

            const req = mockRequest();
            const res = mockResponse();

            toDoController.patchTodo(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({_id: 1, text: 'Test todo', done: true});
        })

        it('should throw an error an error occurs', () => {
            const error = new Error('Error');
            jest.spyOn(ToDo, 'findOneAndUpdate').mockRejectedValueOnce(error);

            const req = mockRequest();
            const res = mockResponse();

            toDoController.patchTodo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        })
    })

    describe('Delete a todo', () => {
        it('should delete a todo', () => {
            jest.spyOn(ToDo, 'findByIdAndRemove').mockResolvedValueOnce({_id: 1, text: 'Test todo', done: true});

            const req = mockRequest();
            const res = mockResponse();

            toDoController.deleteTodo(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({_id: 1, text: 'Test todo', done: true});
        })

        it('should throw an error an error occurs', () => {
            const error = new Error('Error');
            jest.spyOn(ToDo, 'findByIdAndRemove').mockRejectedValueOnce(error);

            const req = mockRequest();
            const res = mockResponse();

            toDoController.deleteTodo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        })
    })

})