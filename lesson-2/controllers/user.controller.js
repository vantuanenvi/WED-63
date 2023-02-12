const jwt = require("jsonwebtoken");
const model = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserController {
  constructor() {}

  login = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
      res.send({
        existed: false,
        token: "",
        message: "Username and password are required",
      });
    } else {
      let user = await model.findByUsername(username);
      if (user && user != null) {
        let checkPassword = await bcrypt.compareSync(password, user.password);
        if (checkPassword) {
          //generate jwt token
          let token = jwt.sign(
            { username: username, email: user.email },
            "ngcaDBiBWKatwMXO5S07"
          );
          res.json({ existed: true, token: token, message:"Found" });
        } else{
            res.send({ existed: false, token: "Password is wrong" });
        }
      }else {
        res.send({ existed: false, token: "User is not exist" });

      }


    }
  };
  create = async (req, res) => {
    let user = req.body;
    user.password = this.hashPassword(user.password);
    let result = await model.create(user);
    res.send(result);
  };

  delete = async (req, res) => {
    let { id } = req.body;
    let result = await model.delete(id);
    res.send(result);
  };

  hashPassword = (plainPass) => {
    let hash = bcrypt.hashSync(plainPass, saltRounds);
    return hash;
  };
}

module.exports = new UserController();
