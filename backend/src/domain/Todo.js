
function makeTodo({
    _id,
    task,
    done = false, // false ist der Standardwert / default value für done
    createdAt = Date.now(), // Date.now() ist der Standardwert / default value für createdAt
}) {
    // if(_id.length !== 24) {
    //     throw new Error("Id must be 24 hex characters...")
    // }

    if(typeof task !== "string" || task.length < 1) {
        throw new Error("Todo task must have at least one character.")
    }

    if(typeof done !== "boolean") {
        throw new Error("Todo done must be eather true or false.")
    }

    if(typeof createdAt !== "number") {
        throw new Error("Todo done must be epoch timestamp.")
    }

    return {
        _id,
        task,
        done,
        createdAt
    }
}

module.exports = {
    makeTodo
}

// Beispiele
// const todo = makeTodo({ _id: 1, task: "pause machen", done: false, createdAt: 12345678 })
// console.log(todo) // { _id: 1, task: "pause machne", done: false, createdAt: 12345678 }

// const todo = makeTodo({ _id: 1, task: "pause machen", done: true })
// console.log(todo) // { _id: 1, task: "pause machne", done: true, createdAt: 1694095030 }

// const todo = makeTodo({ _id: 1, task: "pause machen" })
// console.log(todo) // { _id: 1, task: "pause machne", done: false, createdAt: 1694095030 }

// const todo = makeTodo({ _id: 1, task: "" }) // throw new error
// console.log(todo) // { _id: 1, task: "pause machne", done: false, createdAt: 1694095030 }

// const todo = makeTodo({ task: "mein Todo" }) // throw new error
// console.log(todo) // { task: "mein Todo", done: false, createdAt: 1694095030 }

// Fazit: makeTodo ist wie ein "Filter" der mir als Output gewisse Garantien bietet.
// Garantien zb: 
//    * ("_id" ist optional)
//    * "task" ist ein string der existiert und hat die länge von 1 oder mehr
//    * "done" muss ein boolean sein, default value is false
//    * "createdAt" muss eine zahl sein und hat den default value Date.now() beim aufrufen der funktion...