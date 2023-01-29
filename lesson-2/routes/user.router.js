const { ObjectID, ObjectId } = require("bson");
const mongoose = require('mongoose');
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

router.get("/", (req, res) => {
  MongoClient.connect(
    "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
    (err, client) => {
      if (err) throw err;

      // truy cap data base web63
      const db = client.db("web63");
      //truy cap collection users
      db.collection("users")
      
      res.send('cai gi day')
    })
});
//check login
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    // throw new Error ('Please write username and password')
  } else {
    //ket not mongo db sever
    MongoClient.connect(
      "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
      (err, client) => {
        if (err) throw err;

        // truy cap data base web63
        const db = client.db("web63");
        //truy cap collection users
        db.collection("users")
          .find({ username: username, password: password })
          .toArray((err, result) => {
            if (err) throw err;

            if (result && result != null && result.length > 0) {
              let token = jwt.sign(
                { username: username, email: result[0].email },
                "ngcaDBiBWKatwMXO5S07"
              );
              res.send({ success: true, token: token });
              console.log("check user", result);
            } else res.send({ success: false, token: "" });
          });
      }
    );
  }
});


// Create new user
router.post("/add-user", (req, res) => {
  MongoClient.connect(
    "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
    async (err, client) => {
      if (err) throw err;

      // truy cap data base web-63
      const db = client.db("web63");

      const result = await db.collection("users").insertOne(req.body);
      res.send(result);
    }
  );
});


//update  user
router.put("/:userId",(req, res)=>{
  const {userId} = req.params;
  if(!userId){
    // throw new Error ('user not exist')
  }
  else{
    MongoClient.connect(
      "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
      async (err, client) => {
        if (err) throw err;
  
        // truy cap data base web-63
        const db = client.db("web63");

        db.collection("users")
        .find({_id:ObjectId(userId)})
        .toArray(
         async (err, result)=>{
          if(err) throw err;
          if(result){

            const Users = mongoose.model('Users', {
              _id: { type: String },
              firstname: { type: String },
              lastname: { type: String },
              username:{type: String},
              password:{type: String},
              email:{type: String}
          })
        
    
            
            const userUpdated = await db.collection("users")
            .updateOne(Users._id,
              {firstname:result[0].firstname,
              lastname: result[0].lastname,
              username: result[0].username,
              password:result[0].password,
              email:result[0].email

              });
              res.send(userUpdated).json({
                status: "successfully",
                data:userUpdated
              })
          }
        })
  
       
      }
    )}
  })

 


module.exports = router;
