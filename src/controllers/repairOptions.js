const Devices = require('../models/device')
const RepairOptions = require('../models/repairOptions')
const mongoose = require('mongoose')

// POST:/api/repairoptions/create
async function create(req, res) {
    try {

        const { name, image, description, price, estimatedTime, warranty, deviceId } = req.body

        if (
            !name ||
            !description ||
            !price ||
            !estimatedTime ||
            !warranty ||
            !deviceId
        ) {
            return res.status(400).json({
                message: "All fields required!!!"
            })
        }

        const data = await RepairOptions.create({
            name,
            image,
            description,
            price,
            estimatedTime,
            warranty,
            deviceId
        })

        if (!data) {
            return res.status(500).json({
                message: "Internal server error!!!"
            })
        }

        return res.status(201).json({
            message: "Option Created Sucessfully!!!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

// Delete :/api/repairoptions/delete/${id}
async function remove(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required!!!"
            })
        }

        const resp = await RepairOptions.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Option Deleted Sucessfully!!!",
            resp
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

// PUT:/api/repairoptions/update/${id}
async function update(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required!!!"
            })
        }

        const { name, image, description, price, estimatedTime, warranty } = req.body

        if (
            !name ||
            !description ||
            !price ||
            !estimatedTime ||
            !warranty
        ) {
            return res.status(400).json({
                message: "All fields required!!!"
            })
        }

        const data = await RepairOptions.findByIdAndUpdate(id, {
            name,
            image,
            description,
            price,
            estimatedTime,
            warranty,
        }, { new: true })

        if (!data) {
            return res.status(500).json({
                message: "Internal server error!!!"
            })
        }

        return res.status(201).json({
            message: "Option updated Sucessfully!!!",
            data
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

// GET:/api/repairoptions/get/${id}
async function getRepairOptions(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required!!!"
            })
        }

        const data = await RepairOptions.find({ deviceId: id })

        return res.status(200).json({
            message: "Repair options found!!!",
            data
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}


async function getDeviceRepairOptions(req, res) {
    try {
        const { id } = req.params;

        const data = await Devices.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "repairoptions",
                    localField: "_id",
                    foreignField: "deviceId",
                    as: "repairOptions"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    repairOptions: 1
                }
            }
        ]);

        return res.status(200).json({
            message: "Repair options found successfully",
            data: data[0]
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        });
    }
}


module.exports = { create, remove, getRepairOptions, getDeviceRepairOptions, update }