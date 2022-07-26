const { TodosDAO } = require("../db-access");
const { makeTodo } = require("../domain/Todo");

function addTodo({ task }) {
    const todo = makeTodo({ task })
    return TodosDAO.addTodo(todo)
}

module.exports = {
    addTodo
}