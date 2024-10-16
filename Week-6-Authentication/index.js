const express = require("express");
const JWT_SECRET = "abcde";
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) return res.json({
        message: "Account already exists",
    });

    users.push({
        username: username,
        password: password,
    });

    console.log(users);

    return res.json({
        message: "Signed up successfully"
    })
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
        const token = jwt.sign({
            username: username,
        }, JWT_SECRET);

        return res.json({
            token: token
        })
    } else {
        return res.status(403).json({
            message: "Incorrect credentials"
        })
    }

});

function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const decodedData = jwt.verify(token, JWT_SECRET);
    if (decodedData.username) {
        req.username = decodedData.username;
        next();
    } else {
        return res.status(401).json({ error: "unauthorized" });
    }

}

app.get("/me", auth, (req, res) => {
    const username = req.username;

    res.json({
        username: username
    })
})

app.listen(3000, function () {
    console.log(`Server is running on port 3000`);
});