const exp = require("express");
const router = exp.Router();
const controller = require('../controllers/order.controller')

//GET api
router.get("/", controller.getAll);

//GET by id
router.get("/:id", controller.getById);

//GET order detail by id
router.get("/detail/:id",controller.getOderDetailById)

// create order
router.post("/",controller.create);

//update order
router.put("/:id",controller.update)

//delete order
router.delete("/:id",controller.delete)

//Aggregation
router.get("/aggregate",controller.aggregate);

module.exports = router;
