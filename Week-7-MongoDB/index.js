const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");

require("dotenv").config();

mongoose.connect(process.env.DB_URL).then(function () {
    console.log(`DB connected`);

})

const app = express();

app.use(express.json());

app.post("/signup", async function (req, res) {

    const requiredBody = z.object({
        email: z.string().min(5).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(3).max(30)
    })

    const parseData =  requiredBody.safeParse(req.body);

    if(!parseData.success) {
        return res.json({
            message: "Incorrect format",
            // error: parseData.error.issues[0].message
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
        const hashPassword = await bcrypt.hash(password.toString(), 5);

        await UserModel.create({
            email: email,
            password: hashPassword,
            name: name
        });

        res.json({
            message: "You are signed up"
        })
    } catch (err) {
        res.json({
            error: err.toString()
        })
    }
});

app.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    });

    if (!user) return res.status(403).json({ message: "User does not exist." });

    const passwordMatch = await bcrypt.compare(password.toString(), user.password);

    // console.log(user);


    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    })
    res.json({
        message: "Todo add successfully"
    })
})

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    })

    res.json({
        todos: todos,
    })
});

function auth(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}

app.listen(3000, function () {
    console.log(`Server is listenting on port ${3000}`);
});