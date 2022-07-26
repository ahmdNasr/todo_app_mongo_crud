const { TodosDAO } = require("../db-access");

function editTodoDone({ todoId, doneValue }) {
    TodosDAO.toggleTodoDone(todoId, doneValue)
}

module.exports = {
    editTodoDone
}