const mongoose = require("mongoose");
class database {
  constructor() {}
  connect = async () => {
    await mongoose.connect(
      "mongodb+srv://web63tuan:web63!tuan@cluster0.hkdxqtt.mongodb.net/web63?retryWrites=true&w=majority"
    );
  };
}

module.exports = database;