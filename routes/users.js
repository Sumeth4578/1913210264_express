var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('แมว');
 res.status(200).json({
  fullname:'Sumeth Thanadilok'
})
});

router.get('/bio', function(req, res, next) {
  // res.send('แมว');
  res.status(200).json({
   fullname:'Sumeth Thanadilok',
   nickname:'Touch',
   hobby:'Sleep',
   gitusername:'Sumeth4578'
 })
 });

module.exports = router;
