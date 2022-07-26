const { TodosDAO } = require("../db-access");

function removeTodo({ todoId }) {
    return TodosDAO.removeTodo(todoId)
}

module.exports = {
    removeTodo
}