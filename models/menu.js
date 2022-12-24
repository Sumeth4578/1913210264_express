const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  { collection: "menus", timestamps: true }
);

const menu = mongoose.model("menu", menuSchema);

module.exports = menu;
