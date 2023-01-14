const User = require("../models/user");
exports.index = (req, res, next) => {
  res.status(200).json({
    fullname: "Sumeth Thanadilok",
  });
};

exports.bio = (req, res, next) => {
  res.status(200).json({
    fullname: "Sumeth Thanadilok",
    nickname: "Touch",
    hobby: "Sleep",
    gitusername: "Sumeth4578",
  });
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = new User();
  user.name = name;
  user.email = email;
  user.password = await user.encryptPassword(password);

  await user.save();

  res.status(201).json({
    message: "ลงทะเบียนเรียบร้อย",
  });
};
