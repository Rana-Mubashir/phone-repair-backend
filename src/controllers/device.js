const Category = require('../models/category')
const Devices = require('../models/device')
const Brands = require('../models/brand')
const { default: mongoose } = require('mongoose')

// POST:/api/device/create
async function create(req, res) {
  try {

    const { seriesId, name, image } = req.body

    if (!seriesId) {
      return res.status(400).json({
        message: "SeriesId required!!!"
      })
    }

    if (!name) {
      return res.status(400).json({
        message: "Device name is required!!!"
      })
    }

    const device = await Devices.create({ name, image, seriesId })

    if (!device) {
      return res.status(500).json({
        message: "Something went wrong in creating device,Try Again!!!"
      })
    }

    return res.status(201).json({
      message: "Device Created Sucessfully!!!",
      device
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!!!",
      error: error.message
    })
  }
}

// DELETE:/api/device/delete/:id
async function remove(req, res) {
  try {

    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: "Id must be required!!!"
      })
    }

    const resp = await Devices.findByIdAndDelete(id)

    if (!resp) {
      return res.status(404).json({
        message: "No device found!!!"
      })
    }

    return res.status(200).json({
      message: "Device Deleted Sucessfully!!!"
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!!!",
      error: error.message
    })
  }
}

// GET:/api/device/get
async function getAll(req, res) {
  try {

    const resp = await Category.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "categoryId",
          as: "brands"
        }
      },
      { $unwind: { path: "$brands", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "series",
          localField: "brands._id",
          foreignField: "brandId",
          as: "series"
        }
      },
      { $unwind: { path: "$series", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "devices",
          localField: "series._id",
          foreignField: "seriesId",
          as: "devices"
        }
      },
      { $unwind: "$devices" }, // No preserveNullAndEmptyArrays to remove null entries

      {
        $project: {
          _id: "$devices._id",
          category: "$name",
          brand: "$brands.name",
          series: "$series.name",
          device: "$devices.name"
        }
      }
    ]);



    if (resp.length === 0) {
      return res.status(404).json({
        message: "No devices",
        data: resp,
      })
    }

    return res.status(200).json({
      message: "Devices found!!!",
      devices: resp
    })


  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!!!",
      error: error.message
    })
  }
}

// GET:/api/device/getdevicesbybrand/:id
async function getDeviceByBrand(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id must be required" });
    }

    const resp = await Brands.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "series",
          localField: "_id",
          foreignField: "brandId",
          as: "series",
        },
      },
      {
        $unwind: {
          path: "$series",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "devices",
          localField: "series._id",
          foreignField: "seriesId",
          as: "series.devices",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          series: {
            $push: "$series",
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          series: {
            _id: 1,
            name: 1,
            devices: 1,
          },
        },
      },
    ]);

    if (resp.length === 0) {
      return res.status(404).json({ message: "No devices found!!!" });
    }

    return res.status(200).json({
      message: "Devices Found!!!",
      data: resp[0],
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!!!",
      error: error.message,
    });
  }
}

async function getAllDevicesName(req, res) {
  try {

    const data=await Devices.find().select("name")

    return res.status(200).json({
      message:"Devices found",
      data
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!!!",
      error: error.message
    })
  }
}


module.exports = { create, remove, getAll, getDeviceByBrand,getAllDevicesName }