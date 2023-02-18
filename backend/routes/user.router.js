const exp = require("express");
const router = exp.Router();
const controller = require("../controllers/user.controller")
const validateToken = require("../validateToken")

router.post("/login",controller.login);

router.post("/", validateToken,controller.create);

router.delete("/", controller.delete);
module.exports = router;
