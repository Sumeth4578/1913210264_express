var express = require("express");
var router = express.Router();
const staffController = require("../controllers/staffController");

/* GET users listing. */
router.get("/", staffController.index);
router.post("/", staffController.insert);


module.exports = router;