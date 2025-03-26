const express = require('express')
const app = express()

app.use(express.json()) // Middleware to parse JSON request bodies

// Sample in-memory data
let users = ["userOne", "userTwo", "userThree"];

// GET - Retrieve data
app.get("/api/users", (req, res) => {
    res.json({ users });
});

// POST - Add new data
app.post("/api/users", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    users.push(name);
    res.status(201).json({ message: "User added", users });
});

// PUT - Update existing data
app.put("/api/users/:index", (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    if (!name || index < 0 || index >= users.length) {
        return res.status(400).json({ error: "Invalid request" });
    }
    users[index] = name;
    res.json({ message: "User updated", users });
});

// DELETE - Remove data
app.delete("/api/users/:index", (req, res) => {
    const { index } = req.params;
    if (index < 0 || index >= users.length) {
        return res.status(400).json({ error: "Invalid index" });
    }
    users.splice(index, 1);
    res.json({ message: "User deleted", users });
});

app.listen(5002, () => console.log("Server started on port 5002"))
