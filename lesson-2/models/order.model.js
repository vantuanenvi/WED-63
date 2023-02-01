const { default: mongoose } = require("mongoose");
const OrderSchema = require("../schemas/order.schema");
const BaseModel = require("./base.model");

class OrderModel extends BaseModel {
  constructor() {
    super();
    this.init("orders", OrderSchema);
  }

async getOrderDetail(id) {
    let agg = [
      {
        $unwind: {
          path: "$items",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name",
          },
          size: {
            $first: "$size",
          },
          date: {
            $first: "$date",
          },
          createdBy: {
            $first: "$createdBy",
          },
          items: {
            $push: "$product",
          },
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(`${id}`),
        },
      },
    ];

    let result = await this.model.aggregate(agg).exec();

    if(result.length > 0) return result[0]
    
    return this.get(id);
  }
}

module.exports = new OrderModel();
