var express = require("express");
var router = express.Router();
const companyController = require("../controllers/companyController");

/* GET users listing. */
router.get("/", companyController.company);


module.exports = router;