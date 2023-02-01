const exp = require("express");
const jwt = require("jsonwebtoken");
const router = exp.Router();
const MongoClient = require("mongodb").MongoClient;
const UserModel = require("../models/user.model");

const model = new UserModel();

router.get("/", (req, res) => {
  res.send("Day la user api");
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    // throw new Error("Thieu username hoac password");
    res.send({ sucess: false, token: "" });
  } else {
    // MongoClient.connect(
   //"mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
    //   (err, client) => {
    //     if (err) throw err;

    //     const db = client.db("web63");

    //     db.collection("users")
    //       .find({ username: username, password: password })
    //       .toArray((err, result) => {
    //         if (err) throw err;

    //         if (result && result != null && result.length > 0) {
    //           let token = jwt.sign(
    //             { username: username, email: result[0].email },
    //             "ngcaDBiBWKatwMXO5S07"
    //           );
    //           res.send({ sucess: true, token: token });
    //         } else {
    //           res.send({ sucess: false, token: "" });
    //         }
    //       });
    //   }
    // );

    model.findByUsernameAndPassword(username, password).then((data) => {
      console.log(data);
      if (data && data != null) {
        //generate jwt token
        let token = jwt.sign(
          { username: username, email: data.email },
          "ngcaDBiBWKatwMXO5S07"
        );
        res.json({ existed: true, token: token });
      } else {
        res.send({ sucess: false, token: "" });
      }
    });
  }
});

router.put("/", (req, res) => {
  MongoClient.connect(
    "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
    async (err, client) => {
      if (err) throw err;

      const db = client.db("web63");

      const result = await db.collection("users").insertOne(req.body);
      res.send(result);
    }
  );
});
module.exports = router;
