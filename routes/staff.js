var express = require("express");
var router = express.Router();
const staffController = require("../controllers/staffController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT")

/* GET users listing. */
router.get("/",[passportJWT.isLogin], staffController.index);

router.get("/:id", staffController.show);
router.delete("/:id", staffController.destroy);
router.put("/:id", staffController.update);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนข้อมูล"),
    body("salary")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนเงินเดือน")
      .isNumeric()
      .withMessage("กรุณาป้อนตัวเลขเงินเดือน"),
  ],
  staffController.insert
);

module.exports = router;
