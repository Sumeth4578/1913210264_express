const mongoose = require('mongoose');
const Schema= mongoose.Schema

const companySchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    address: {
      province: String,
    }
  });

const company = mongoose.model("Companys" , companySchema);

module.exports = company;