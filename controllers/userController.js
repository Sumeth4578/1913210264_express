const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

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
  try {
    const { name, email, password } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    // validation

    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
      const error = new Error("อีเมล์นี้มีผู้ใช้งานในระบบแล้ว");
      error.statusCode = 400;
      throw error;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      message: "ลงทะเบียนเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    //create token
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.KEY,
      { expiresIn: "5 days" }
    );

    const expire_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expire_in: expire_in.exp,
      token_type: 'Bearer',
    });
  } catch (error) {
    next(error);
  }
};
