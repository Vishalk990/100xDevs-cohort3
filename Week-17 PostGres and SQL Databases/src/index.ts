import { Client } from "pg";
import express from "express";

const app = express();
const pgClient = new Client(
  "demoUrl"
);

// async function main() {
//   await pgClient.connect();

//   const response = await pgClient.query("SELECT * FROM users;");
//   console.log(response.rows);
// }

// main();

pgClient.connect();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    // SQL injection prone queries

    // const response = await pgClient.query(
    //   `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');` // );

    // Code to prevent SQL Injection
    const query = `INSERT INTO users (username, email,password) VALUES ($1,$2,$3);`;
    const response = await pgClient.query(query, [username, email, password]);
    console.log(response);

    res.json({
      message: "You have signed up",
    });
  } catch (e) {
    res.json({ message: "Error while signing up" });
  }
});

app.listen(3000, () => {
    console.log(`server started running on port 3000`);
    
});