const { ObjectID } = require("bson");
const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    name: String,
    size: String,
    price: Number,
    quantity: Number,
    date: Date,
    createdBy: ObjectID,
    items: Array.of(ObjectID)
})

module.exports = OrderSchema