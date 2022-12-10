const Company = require('../models/company')

exports.index = async (req, res, next) => {

  const company = await Company.findOne()

  res.status(200).json({
    data : company,
  });
};

exports.insert = async (req, res, next) => {
  const { name,address:{province} } = req.body;
  let company = new Company({
    name: name,
    address:{ 
      province: province
    },
  });
  await company.save();

  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
  });
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await Company.findOne({
      _id: id,
    });
    if (!company) {
      throw new Error("ไม่พบข้อมูล");
    } else {
      res.status(200).json({
        data: company,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error: " + error.message,
    });
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await Company.deleteOne({
      _id: id,
    });

    if (company.deletedCount === 0) {
      throw new Error("ไม่สามารถลบข้อมูลได้");
    } else {
      res.status(200).json({
        message: "ลบข้อมูลแล้ว",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error: " + error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, address:{province} } = req.body;

    // 1
    //  const company = await Company.findByIdAndUpdate(id,{
    //      name:name,
    //      address:{
    //      province:province
    //      }
    //  })

    // 2
     const company = await Company.updateOne(
       { _id: id },
       {
         name: name,
         address: {
           province : province
         },
       }
     );
    if (company.nModified === 0) {
        throw new Error("ไม่ได้อัพเดทข้อมูล");
      } else {
        res.status(200).json({
          message: "อัพเดทแล้ว",
        });
      }

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error: " + error.message,
    });
  }
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