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
