const express = require('express');

const {getAllTodos, AddNewTodo, UpdateTodoById, DeleteTodoById} = require('../Controller/todo-Controller')

const router = express.Router();

router.get('/',getAllTodos);

router.post('/', AddNewTodo);

router.put('/:id', UpdateTodoById);

router.delete('/:id', DeleteTodoById);

module.exports = router;