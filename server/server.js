// import
const express = require("express");
const cors = require("cors");

// initialize
const app = express();

// port
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// fake db
let users = [];

// root get api
app.get("/", (req, res) => {
  res.send("your server is running");
});

// users: get api
app.get("/users", (req, res) => {
  res.send(users);
});

// single user get api
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const findingUser = users.find((user) => user.id === Number(id)) || {};
  res.send(findingUser);
});

// user add post api
app.post("/users/add", (req, res) => {
  const user = req.body;
  const id = parseInt(Math.random() * 1000000000);
  const modifiedUser = { id: id, name: user.name, age: user.age };
  users.push(modifiedUser);
  res.json("user added");
});

// user delete api
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const remainingUser = users.filter((user) => user.id !== Number(id));
  users = remainingUser;
  res.json("deleted");
});

// update user put api
app.put("/update", (req, res) => {
  const selectedUser = req.body;
  const updatedUsers = users.filter(
    (user) => user.id !== Number(selectedUser.id)
  );
  updatedUsers.push(selectedUser);
  users = updatedUsers;
  res.json("updated");
});

app.listen(port, () => console.log("server is running on port", port));
