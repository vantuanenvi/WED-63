const { default: mongoose } = require("mongoose");

class BaseModel {
  constructor() {}

  init(name, schema) {
    this.model = mongoose.model(name, schema);
  }

  //R = Research
  get(id) {
    let query = this.model.findById(id);
    return query.exec();
  }

  //C = Create
  create(data) {
    let result = this.model.create(data);
    return result;
  }

  //U = Update
  update(id, data){
    let result = this.model.updateOne({_id: id}, data)
    return result;
  }

  //D = Delete
  delete(id){
    let result = this.model.deleteOne({_id: id})
    return result;
  }
}

module.exports = BaseModel
