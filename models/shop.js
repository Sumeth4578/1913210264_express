const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: "nopic.png" },
    location: {
      lat: Number,
      lgn: Number,
    },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { collection: "shops", timestamps: true }
);

const shop = mongoose.model("Shop", staffSchema);

module.exports = shop;
