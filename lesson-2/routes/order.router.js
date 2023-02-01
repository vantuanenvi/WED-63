const exp = require("express");
const router = exp.Router();
const MongoClient = require("mongodb").MongoClient;
const model = require("../models/order.model");
//GET api
router.get("/", async (req, res) => {
  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByUser",
      },
    },
    {
      $unwind: {
        path: "$createdByUser",
      },
    },
  ];

  const client = await MongoClient.connect(
  "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db("web63").collection("orders");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  res.send(result);
});

//GET by id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  model.get(id).then((data) => {
    res.send(data);
  });
});

//GET order detail by id
router.get("/detail/:id", async (req, res)=>{
  let {id} = req.params;
  let result = await model.getOrderDetail(id)
  res.send(result)
})

//GET api
router.get("/:orderId/:custId", (req, res) => {
  const { orderId, custId } = req.params;
  console.log(`orderId: ${orderId}, custId: ${custId}`);
  res.send("get orders by order id and customer id");
});

router.get("/aggregate", async (req, res) => {
  const agg = [
    {
      $match: {
        size: `${req.query.size}`,
      },
    },
    {
      $group: {
        _id: "$name",
        totalQuantity: {
          $sum: "$quantity",
        },
        averageOrderPrice: {
          $avg: "$price",
        },
      },
    },
  ];

  const client = await MongoClient.connect(
    "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const coll = client.db("web63").collection("orders");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  res.send(result);
});

module.exports = router;
