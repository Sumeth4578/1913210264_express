const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number },
    shop: { type: Schema.Types.ObjectId, ref: "Shop" },
  },
  { collection: "menus", timestamps: true, toJSON: { virtuals: true } }
);

menuSchema.virtual("price_vat").get(function () {
  return (this.price * 0.07) + this.price;
});


const menu = mongoose.model("menu", menuSchema);

module.exports = menu;
