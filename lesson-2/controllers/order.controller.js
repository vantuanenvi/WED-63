const model = require("../models/order.model")

class OrderController{
    constructor(){}

    getAll = async ( req, res) =>{
        let result = await model.getAll();
        res.send(result)
    };

    getById = async (req, res) => {
        let {id} = req.params ;
        let result = await model.get(id);
        res.send(result)
    };

    getOderDetailById = async (req, res) => {
        let { id } = req.params;
        let result = await model.getOrderDetail(id);
        res.send(result);
    };   

    aggregate = async (req, res) => {
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
}
    create = async (req, res)=>{
        let order = req.body;
        let result = await model.create(order);
        res.send(result);
    }
    
    update = async ( req, res)=>{
        let {id} = req.params
        let newOrder = req.body;
        let result = await model.update(id,newOrder);
       res.send(result);
    }

    delete = async (req,res) =>{
        let {id} = req.params;
        let result = await model.delete(id);
        res.send(result);
    }    
}
module.exports = new OrderController()