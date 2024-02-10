const PackageSc = require('../model/packageSc');

const postPackage = async(req, res) => {

    try {
        await PackageSc.create(req.body);
        res.status(201).json({
            message: 'New Package Created'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const editPackage = async(req, res) => {
    const id = req.params.id;

    try {
        const oneData = await PackageSc.findByIdAndUpdate(id, req.body);

        res.status(200).json({
            oneData
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getPackage = async(req, res) => {

    try {
        const AllData = await PackageSc.find({})
        res.status(200).json({
            AllData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deletePackage = async(req, res) => {
    const id = req.params.id;

    try {
        await PackageSc.findByIdAndRemove(id);

        res.status(200).json({
            message: 'Deleted'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const togglePackage = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await PackageSc.findByIdAndUpdate(id, {
            is_active
        })

        res.status(200).json({
            oneData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    postPackage,
    editPackage,
    getPackage,
    deletePackage,
    togglePackage
}