const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const { todosRouter } = require("./routes/todos-router")

const PORT = process.env.PORT || 1818
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// ==== ROUTES ====
app.get("/", (_, res) => res.send("it works :)"))

// TODOS
app.use("/todos", todosRouter)

// USERS
// app.use("/users", usersRouter)
// usw...

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