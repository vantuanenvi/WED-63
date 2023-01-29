const { json } = require("express");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const router = express.Router();

router.get("/", (req, res) => {
  const { userId } = req.query;
  const { token } = req.headers;
  console.log(`UserId: ${userId}`);
  console.log(`Token: ${token}`);
  res.send("get userid and token");
});
router.get("/:orderId", (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    // throw new Error ('order not exist ')
  } else {
    //ket noi mongo db sv
    MongoClient.connect(
      "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
      (err, client) => {
        if (err) throw err;
        // truy cap data base web63

        const db = client.db("web63");

        //truy cap collection orders
        db.collection("orders")
          .find({ _id: ObjectId(orderId) })
          .toArray((err, result) => {
            if (err) throw err;
            
            if (result) {
              res.send({ status: "Successfully", data: result }).json();
            }
          });
      }
    );
  }
});

module.exports = router;
