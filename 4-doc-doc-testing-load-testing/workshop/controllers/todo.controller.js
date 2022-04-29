const { ToDo } = require('../models/todo.model.js');

exports.getTodos = (req, res) => {
    ToDo.find()
        .then((toDos) => res.status(200).send(toDos))
        .catch((err) => res.status(400).send(err))
};

exports.createTodo = (req, res) => {
    const body = req.body;
    const toDo = new ToDo({
        text: body.text,
    });

    toDo.save(toDo)
        .then((savedToDo) => res.status(201).send(savedToDo))
        .catch((err) => res.status(400).send(err))
};

exports.patchTodo = (req, res) => {
    const { id } = req.params;

    ToDo.findOneAndUpdate({ _id: id }, { done: true }, { new: true })
        .then((toDo) => res.status(200).send(toDo))
        .catch((err) => res.status(400).send(err))
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    ToDo.findByIdAndRemove(id)
        .then((toDo) => {
            res.status(204).send()
        })
        .catch((err) => res.status(400).send(err))
}
