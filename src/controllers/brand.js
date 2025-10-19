const { default: mongoose } = require('mongoose')
const Brands = require('../models/brand')
const Category = require('../models/category')


// POST:/api/brand/create
async function create(req, res) {
    try {

        const { name, image, categoryId } = req.body

        if (!name || !categoryId) {
            return res.status(400).json({
                message: "All Fields Required!!!"
            })
        }

        const findOne = await Brands.findOne({ name, categoryId })

        if (findOne) {
            return res.status(400).json({
                message: "Already Have A Brand With This Name!!!"
            })
        }

        const createOne = await Brands.create({ name, image, categoryId })

        if (!createOne) {
            return res.status(500).json({
                message: "Something Went Wrong In Creating Brand,Try Again!!!",
            })
        }

        return res.status(201).json({
            message: "Brand Created Sucessfully!!!",
            createOne
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In Creating Brand,Try Again!!!",
            error: error.message
        })
    }
}

// DELETE:/api/brand/delete/:id
async function remove(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id Must Be Required!!!"
            })
        }

        const deleteOne = await Brands.findByIdAndDelete(id)

        if (!deleteOne) {
            return res.status(404).json({
                message: "Something Went Wrong In Deleting Brand,Try Again!!!"
            })
        }

        return res.status(200).json({
            message: "Brand Deleted Sucessfully!!!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In Deleting Brand,Try Again!!!",
            error: error.message
        })
    }
}

// PUT:/api/brand/update/:id
async function update(req, res) {
    try {

        const { name, image, categoryId } = req.body

        if (!name || !categoryId) {
            return res.status(400).json({
                message: "All Fields Required!!!"
            })
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id Must Be Required!!!"
            })
        }

        const updated = await Brands.findByIdAndUpdate(
            id,
            { name, image, categoryId },
            { new: true }
        )

        if (!updated) {
            return res.status(500).json({
                message: "Something Went Wrong In Updating Brand,Try Again!!!",
            })
        }

        return res.status(200).json({
            message: "Brand Updated Sucessfully!!!"
        })


    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In Updating Brand,Try Again!!!",
            error: error.message
        })
    }
}

// GET:/api/brand/getall
async function getAll(req, res) {
    try {

        const { categoryId } = req.query || null

        const brands = await Category.aggregate([
            {
                $lookup: {
                    from: "brands",
                    localField: "_id",
                    foreignField: "categoryId",
                    as: "brands"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    brands: 1,
                }
            }
        ])

        if (brands.length === 0) {
            return res.status(404).json({
                message: "No Brands Found!!!"
            })
        }

        const filteredBrands=brands.filter((bran) => bran._id == categoryId)

        return res.status(200).json({
            message: "Brands Found Sucessfully!!!",
            brands:categoryId ? filteredBrands :brands
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In Getting All Brands,Try Again!!!",
            error: error.message
        })
    }
}

// GET:/api/brand/getbycategory/:id
async function getBrandsByCategory(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Id must be required!!!"
            })
        }

        const brands = await Category.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: '_id',
                    foreignField: "categoryId",
                    as: "brands"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    brands: 1
                }
            }
        ])

        if (brands.length === 0) {
            return res.status(200).json({
                message: "No brands found !!!"
            })
        }

        return res.status(200).json({
            message: "Brands found!!!",
            brands
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

module.exports = { create, remove, update, getAll, getBrandsByCategory }

