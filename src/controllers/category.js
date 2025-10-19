const Category = require('../models/category')


// POST:/api/category/create
async function create(req, res) {
    try {
        const { name, description, image } = req.body

        if (!name || !description) {
            return res.status(400).json({
                message: "All Fields Required!!!"
            })
        }

        const findCategory = await Category.findOne({ 
            name: { $regex: `^${name.trim()}$`, $options: 'i' }
         })

        if (findCategory) {
            return res.status(400).json({
                message: "Already have a category with this name !!!"
            })
        }

        const createOne = await Category.create({ name, image, description })

        if (!createOne) {
            return res.status(500).json({
                message: "Something Went Wrong In Creating Category,Try Again!!!"
            })
        }

        return res.status(201).json({
            message: "Category Created Sucessfully!!!",
            createOne
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In Creating Category,Try Again!!!",
            error: error.message
        })
    }
}

// DELETE:/api/category/delete/:id
async function remove(req, res) {
    try {

        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                message: "Category Id Must Be Required!!!"
            })
        }

        const deleteOne = await Category.findByIdAndDelete(id)

        if (!deleteOne) {
            return res.status(404).json({
                message: "No Category Found With This Id!!!"
            })
        }

        return res.status(200).json({
            message: "Category Deleted Sucessfully!!!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In deleting Category,Try Again!!!",
            error: error.message
        })
    }
}

// PUT:/api/category/update/:id
async function update(req, res) {
    try {
        
        const { name, image, description } = req.body

        if (!name || !description) {
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

        const updated = await Category.findByIdAndUpdate(
            id,
            { name, image, description },
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({
                message: "No Category Found With This Id!!!"
            })
        }

        return res.status(200).json({
            message: "Category Updated Sucessfully!!!",
            updated
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In updating Category,Try Again!!!",
            error: error.message
        })
    }
}

// GET:/api/category/getall
async function getAll(req, res) {
    try {

        const { categoryName } = req.query

        let query = {}

        if (categoryName) {
            query.name = { $regex: categoryName, $options: "i" }
        }
        
        const categories = await Category.find(query)

        if (categories.length === 0) {
            return res.status(200).json({
                message: "No Categories Found!!!",
                categories
            })
        }

        return res.status(200).json({
            message: "Categories Found Sucessfully!!!",
            categories
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong In Getting Categories,Try Again!!!",
            error: error.message
        })
    }
}


module.exports = { create, remove, update, getAll }