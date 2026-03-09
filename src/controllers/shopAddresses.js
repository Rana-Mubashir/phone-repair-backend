const Addresses = require('../models/shopAddresses')

const getAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.find({}).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: addresses.length,
            data: addresses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const getAddressById = async (req, res) => {
    try {
        const address = await Addresses.findById(req.params.id);
        
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const createAddress = async (req, res) => {
    try {
        const { name, address, timing, isActive } = req.body;

        // Validation
        if (!name || !address || !timing) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if address with same name exists
        const existingAddress = await Addresses.findOne({ name });
        if (existingAddress) {
            return res.status(400).json({
                success: false,
                message: 'Address with this name already exists'
            });
        }

        const newAddress = await Addresses.create({
            name,
            address,
            timing,
            isActive: isActive !== undefined ? isActive : true
        });

        res.status(201).json({
            success: true,
            message: 'Address created successfully',
            data: newAddress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { name, address, timing, isActive } = req.body;
        
        let addressToUpdate = await Addresses.findById(req.params.id);
        
        if (!addressToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Check if name is being changed and if it already exists
        if (name && name !== addressToUpdate.name) {
            const existingAddress = await Addresses.findOne({ 
                name, 
                _id: { $ne: req.params.id } 
            });
            
            if (existingAddress) {
                return res.status(400).json({
                    success: false,
                    message: 'Address with this name already exists'
                });
            }
        }

        addressToUpdate.name = name || addressToUpdate.name;
        addressToUpdate.address = address || addressToUpdate.address;
        addressToUpdate.timing = timing || addressToUpdate.timing;
        addressToUpdate.isActive = isActive !== undefined ? isActive : addressToUpdate.isActive;

        const updatedAddress = await addressToUpdate.save();

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            data: updatedAddress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


const deleteAddress = async (req, res) => {
    try {
        const address = await Addresses.findById(req.params.id);
        
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        await address.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


const toggleAddressStatus = async (req, res) => {
    try {
        const address = await Addresses.findById(req.params.id);
        
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        address.isActive = !address.isActive;
        await address.save();

        res.status(200).json({
            success: true,
            message: `Address ${address.isActive ? 'activated' : 'deactivated'} successfully`,
            data: address
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


const getActiveAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.find({ isActive: true }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: addresses.length,
            data: addresses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


module.exports = {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    toggleAddressStatus,
    getActiveAddresses,
};