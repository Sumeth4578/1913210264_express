const Shop = require("../models/shop");
const Menu = require("../models/menu");

exports.index = async (req, res, next) => {
  const shops = await Shop.find()
    .select("name photo location")
    .sort({ _id: -1 });

  const shopWithPhotoDomain = shops.map((shop, index) => {
    return {
      id: shop._id,
      name: shop.name,
      photo: "http://localhost:3000/images/" + shop.photo,
      location: shop.location,
    };
  });

  res.status(200).json({
    data: shopWithPhotoDomain,
  });
};

exports.menu = async (req, res, next) => {
  //const menu = await Menu.find().select('+name -price')
  //const menu = await Menu.find().select('name price').where('price').gt(100)
  const menu = await Menu.find().populate("shop");

  res.status(200).json({
    data: menu,
  });
};

exports.shopMenu = async (req, res, next) => {
  const { id } = req.params;

  const shop = await Shop.findById({_id:id}).populate('shopMenu')

  res.status(200).json({
    data: shop,
  });
};
