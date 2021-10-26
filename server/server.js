// import
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

// initialize
const app = express();

// port
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// root get api
app.get("/", (req, res) => {
  res.send("your server is running");
});

const uri =
  "mongodb+srv://user_management:hasan_1119@cluster0.pkqud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("user_management");
    const users_collection = database.collection("users");

    // user add api
    app.post("/users/add", async (req, res) => {
      const user = req.body;
      const result = await users_collection.insertOne(user);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.json("user added");
    });

    // users: get api
    app.get("/users", async (req, res) => {
      const cursor = users_collection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // user delete api
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await users_collection.deleteOne(query);

      res.json(result);
    });

    // single user get api
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await users_collection.findOne(query);
      res.send(user);
    });

    // update user put api
    app.put("/update/:id", async (req, res) => {
      const { name, age } = req.body;
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };

      const updateUser = {
        $set: {
          name,
          age,
        },
      };

      const result = await users_collection.updateOne(query, updateUser);
      res.json(result);
    });
  } finally {
  }
}

run().catch((err) => {
  console.log(err);
});

app.listen(port, () => console.log("server is running on port", port));
