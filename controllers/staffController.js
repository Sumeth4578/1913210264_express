const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)


const Staff = require("../models/staff");
const config = require('../config/index')

exports.index = async (req, res, next) => {
  const staff = await Staff.find()
    .select("name photo location")
    .sort({ _id: -1 });

  const staffWithPhotoDomain = staff.map((staff, index) => {
    return {
      id: staff._id,
      name: staff.name,
      photo: config.DOMAIN+"/images/" + staff.photo,
      location: staff.location,
    };
  });

  res.status(200).json({
    data: staffWithPhotoDomain,
  });
};

exports.insert = async (req, res, next) => {
  const { name, salary,photo } = req.body;
  let staff = new Staff({
    name: name,
    salary: salary,
    photo: photo && await saveImageToDisk(photo)
  });
  await staff.save();

  res.status(200).json({
    message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
  });
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findOne({
      _id: id,
    });
    if (!staff) {
      throw new Error("ไม่พบผู้ใช้งาน");
    } else {
      res.status(200).json({
        data: staff,
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

    const staff = await Staff.deleteOne({
      _id: id,
    });

    if (staff.deletedCount === 0) {
      throw new Error("ไม่สามารถลบข้อมูลได้");
    } else {
      res.status(200).json({
        message: "ลบผู้ใช้งานแล้ว",
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
    const { name, salary } = req.body;

    // const staff = await Staff.findById(id)
    // staff.name = name
    // staff.salary = salary
    // await staff.save()

    // const staff = await Staff.findByIdAndUpdate(id,{
    //     name:name,
    //     salary:salary
    // })

    const staff = await Staff.updateOne(
      { _id: id },
      {
        name: name,
        salary: salary,
      }
    );
    if (staff.nModified === 0) {
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

async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4.v4()}.svg`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
