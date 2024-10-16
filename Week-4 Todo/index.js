const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const filepath = "todos.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

app.get("/", (req, res) => {
    return res.send("This is TODO's home page!");
})

app.get("/todos", (req, res) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send({ error: "error reading the file" });
        }
        if(data.length === 0) {
            return res.status(200).send([]);
        }
        return res.status(200).send(JSON.parse(data));
    });
});

app.post("/add-todo", (req, res) => {
    const id = uuidv4();
    const { title, description } = req.body;

    const newTodo = {
        id: id,
        title: title,
        description: description
    };

    fs.readFile(filepath, 'utf-8', (err, data) => {
        let todos = [];
        if (err) {
            return res.status(500).send({ error: "error reading the file" });
        }
        if (data.length > 0)
            todos = JSON.parse(data);

        todos.push(newTodo);

        fs.writeFile(filepath, JSON.stringify(todos), err => {
            if (err)
                return res.status(500).json({ message: "Unable to add todo" });
            else
                return res.status(201).json({ message: "todo added successfully" });
        });
    });


});

app.put("/update-todo", (req, res) => {
    const { id, title, description } = req.body;

    if (!id) {
        return res.status(400).send({ error: "No id" });
    };

    fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: "Error reading todos" });
        }
        let todos = [];
        if (data.length > 0) {
            todos = JSON.parse(data);
        }
        const todo = todos.find((todo) => todo.id === id);

        if(!todo) {
            return res.status(404).send({ error: "Todo not found" });
        }
        todo.title = title || todo.title;
        todo.description = description || todo.description;

        fs.writeFile(filepath, JSON.stringify(todos), (err) => {
            if (err) {
                return res.status(500).send({ error: "Error saving updated todos" });
            }
            return res.status(200).send({ message: "Todo updated successfully" });
        });
    });
});

app.delete("/delete-todo",(req,res) => {
    const {id} = req.body;

    if(!id) {
        return res.status(400).send({error:"id not valid or found"});
    }

    fs.readFile(filepath,'utf-8',(err,data) => {
        if (err) {
            return res.status(500).send({ error: "error reading the file" });
        }
        let todos = [];
        if (data.length > 0) {
            todos = JSON.parse(data);
        } else {
            return res.status(404).send({ error: "No todos found" });
        }

        const newTodos = todos.filter((todo) => todo.id !== id);
        fs.writeFile(filepath,JSON.stringify(newTodos),(err,data) => {
            if (err) {
                return res.status(500).send({ error: "Error deleting todos" });
            }
            return res.status(200).send({ message: "Todo deleted successfully" });
        })
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);

});
