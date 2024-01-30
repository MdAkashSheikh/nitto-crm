const tankInfoSc = require('../model/teamInfoSc');

const postTank = async(req, res) => {
    const { name, details } = req.body;

    try {
        await tankInfoSc.create({
            name, details
        })

        res.status(201).json({
            message: 'New Tank Created'
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const editTank = async(req, res) => {
    const id = req.params.id;

    const { name, details } = req.body;

    try {
        const oneData = await tankInfoSc.findByIdAndUpdate(id, {
            name, details
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

const getTank = async(req, res) => {

    try {
        const AllData = await tankInfoSc.find({});

        res.status(200).json({
            AllData
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteTank = async(req, res) => {
    const id = req.params.id;

    try {
        await tankInfoSc.findByIdAndRemove(id);

        res.status(200).json({
            message: 'Deleted Successfully'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const toggleTank = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await tankInfoSc.findByIdAndUpdate(id,{
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
    postTank,
    editTank,
    getTank,
    deleteTank,
    toggleTank,
}