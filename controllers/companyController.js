const Company = require('../models/company')

exports.index = async (req, res, next) => {

  const company = await Company.findOne()

  res.status(200).json({
    data : company,
  });
};
// exports.company = (req, res, next) => {
//     res.status(200).json({
//       data:[
//         {
//             id:"1",
//             name:"The Real One",
//             address:{
//                 province:"Bangkok",
//                 postcode:"10220"
//             }
//         },
//         {
//             id:"2",
//             name:"Line",
//             address:{
//                 province:"Bangkok",
//                 postcode:"10330"
//             } 
//         },
//       ]
//     });
//   };