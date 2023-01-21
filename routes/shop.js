var express = require("express");
var router = express.Router();
const shopController = require("../controllers/shopController");
const { body } = require("express-validator");

router.get("/", shopController.index);
router.get("/menu", shopController.menu);
router.get("/:id", shopController.shopMenu);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนข้อมูล"),
    body("location").not().isEmpty().withMessage("กรุณาป้อนข้อมูล"),
    body("location.lat")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนข้อมูล")
      .isNumeric()
      .withMessage("กรุณาป้อนข้อมูลเป็นตัวเลข"),
    body("location.lgn")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนข้อมูล")
      .isNumeric()
      .withMessage("กรุณาป้อนข้อมูลเป็นตัวเลข"),
  ],
  shopController.insert
);

module.exports = router;
