const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

router.get("/", (req, res) => {
  res.send("This is user api");
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    // throw new Error ('Please write username and password')

  } else {
    //ket not mongo db sever
    MongoClient.connect("mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test", (err, client) => {
      if (err) throw err;
      
      // truy cap data base web-63
      const db = client.db("web63");
      //truy cap collection users
      db.collection("users")
        .find({ username: username, password: password })
        .toArray((err, result) => {
          if (err) throw err;
         
          if(result && result != null && result.length > 0){
              let token = jwt.sign(
                { username: username, email: result[0].email },
                "ngcaDBiBWKatwMXO5S07"
                );
              res.send({ success: true, token: token });
              console.log('check user',result);
          }
        
          else  res.send({ success: false, token: "" });
        });
    });
  }
});
module.exports = router;
