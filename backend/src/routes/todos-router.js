const express = require("express")
const { addTodo } = require("../use-cases/add-todo")
const { editTodoDone } = require("../use-cases/edit-todo-done")
const { removeTodo } = require("../use-cases/remove-todo")
const { showTodos } = require("../use-cases/show-todos")

const todosRouter = express.Router() // Controller

todosRouter.get("/all", (_, res) => {
    showTodos()
    .then(todos => res.json(todos))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to load todos from database." }) // internal server error
    })
})

todosRouter.post("/add", (req, res) => {
    if(!req.body || !req.body.task) {
        res.status(400).json({ error: "Please include a todo-task." }) // 400 ==> Bad request
        return;
    }

    const newTodo = {
        task: req.body.task,
        done: false,
        createdAt: Date.now()
    }

    addTodo(newTodo)
    .then(addedTodo => res.status(201).json(addedTodo)) // 201 => Created
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to add todo to database." })
    })
})

todosRouter.put("/toggle", (req, res) => {
    const todoId = req.body.todoId
    const newDoneValue = req.body.newDoneValue

    editTodoDone({ todoId, doneValue: newDoneValue })
    .then(updatedTodo => res.json(updatedTodo))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to update todo." })
    })
})

todosRouter.delete("/delete/:id", (req, res) => {
    const todoId = req.params.id
    removeTodo({ todoId })
    .then(removedTodo => res.json({ removedTodo }))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to remove todo." })
    })
})

module.exports = {
    todosRouter
}