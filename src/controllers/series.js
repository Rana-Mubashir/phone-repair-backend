const Series = require('../models/series')
const Category = require('../models/category')

// POST:/api/series/create
async function create(req, res) {
    try {

        const { brandId, name, image } = req.body

        if (!brandId) {
            return res.status(400).json({
                message: "BrandId required!!!"
            })
        }

        if (!name) {
            return res.status(400).json({
                message: "Series name is required!!!"
            })
        }

        const series = await Series.create({ name, image, brandId })

        if (!series) {
            return res.status(500).json({
                message: "Something went wrong in creating series,Try Again!!!"
            })
        }

        return res.status(201).json({
            message: "Series Created Sucessfully!!!",
            series
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

// DELETE:/api/series/delete/:id
async function remove(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required!!!"
            })
        }

        const resp = await Series.findByIdAndDelete(id)

        if (!resp) {
            return res.status(500).json({
                message: "Internal server error!!!"
            })
        }

        return res.status(200).json({
            message: "Series deleted sucessfully!!!",
            resp
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

// GET:/api/series/get
async function getAll(req, res) {
    try {

        const {categoryId} =req.query || null

        const data = await Category.aggregate([
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
                    as: "brands.series"
                },
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    brands: { $push: "$brands" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    brands: 1
                }
            }
        ]);

        const filteredData=data.filter((dat) => dat._id == categoryId)

        return res.status(200).json({
            message: "Data found",
            data:categoryId ? filteredData : data
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        });
    }
}

// GET:/api/series/getbybrand/:id
async function getSeriesByBrand(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required!!!"
            })
        }

        const series = await Series.find({ brandId: id })

        if (series.length === 0) {
            return res.status(200).json({
                message: "No Series Found!!!"
            })
        }

        return res.status(200).json({
            message: "Series Found Sucessfully!!!",
            series
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}


module.exports = { create, getAll, remove, getSeriesByBrand }