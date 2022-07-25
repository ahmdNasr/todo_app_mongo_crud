const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const { getTodos, addTodo, toggleTodoDone, removeTodo } = require("./db-access/todos-dao")

const PORT = process.env.PORT || 1818
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// ==== ROUTES ====
app.get("/", (_, res) => res.send("it works :)"))

app.get("/todos/all", (_, res) => {
    getTodos()
    .then(todos => res.json(todos))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to load todos from database." }) // internal server error
    })
})

app.post("/todos/add", (req, res) => {
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

app.put("/todos/toggle", (req, res) => {
    const todoId = req.body.todoId
    const newDoneValue = req.body.newDoneValue

    toggleTodoDone(todoId, newDoneValue)
    .then(updatedTodo => res.json(updatedTodo))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to update todo." })
    })
})

app.delete("/todos/delete/:id", (req, res) => {
    const todoId = req.params.id
    removeTodo(todoId)
    .then(removedTodo => res.json({ removedTodo }))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "Failed to remove todo." })
    })
})

// 404 not found
app.use((_, res) => {
    res.status(404).json({ error: "Not found." })
})

app.listen(PORT, () => console.log("Server listening on port", PORT))


/*
"Plan"
CRUD 

Create <-> POST
Read <-> GET
Update <-> PUT
Delete <-> DELETE

Todo Hinzufügen
Todos Anzeigen
Todo auf Done/Undone
Todo Löschen aus der List

*/