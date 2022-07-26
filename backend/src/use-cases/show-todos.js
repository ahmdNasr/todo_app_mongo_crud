const { TodosDAO } = require("../db-access");

function showTodos() {
    return TodosDAO
    .getTodos()
    .then(todos => todos.map(todo => ({
        id: todo._id,
        task: todo.task,
        done: todo.done,
        // createdAt lasse ich aus..., weil es eine sensetive information ist
    })))
}

module.exports = {
    showTodos
}