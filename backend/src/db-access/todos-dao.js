const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

function getTodos() {
    return getDB().then(db => db.collection("todos2").find().toArray())
}

function addTodo(todo) {
    return new Promise((resolve, reject) => {
        getDB()
        .then(db => db.collection("todos2").insertOne(todo))
        .then(result => {
            if(result.acknowledged === true && result.insertedId) {
                return resolve({
                    _id: result.insertedId,
                    ...todo,
                })
            } else {
                // result könnte ein error sein, daher reject...
                return reject(result)
            }
        }).catch((err) => reject(err))
    })
}

function toggleTodoDone(todoId, newDoneValue) {
    return new Promise((resolve, reject) => {
        getDB()
        .then(db => db.collection("todos2").findOneAndUpdate(
            { _id: ObjectId(todoId) }, // query/filter (aka. was soll geupdated werden?)
            { $set: { done: newDoneValue } }, // updateInfo
            { returnDocument: "after" }
        ))
        .then(result => {
            if(result.ok === 1) resolve(result.value)
            else reject({ msg: "Error updating todo." }) // custom error message ? oder vlt nur result
        })
        .catch((err) => reject(err))
    })
}

function removeTodo(todoId) {
    return new Promise((resolve, reject) => {
        getDB()
        .then(db => db.collection("todos2").findOneAndDelete({ _id: ObjectId(todoId) }))
        .then(result => {
            if(result.ok === 1) resolve(result.value)
            else reject({ msg: "Error deleting todo." }) // custom error message ? oder vlt nur result
        })
        .catch((err) => reject(err))
    })
}

module.exports = {
    getTodos,
    addTodo,
    toggleTodoDone,
    removeTodo
}