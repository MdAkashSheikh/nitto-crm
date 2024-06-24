const contactSc = require("../model/contactSc");

const postContact = async(req, res) => {
    const name = req.body.name;
    const details = req.body.details;
    try {
        await contactSc.create({
            name, details
        })
        res.status(201).json({
            success: true,
            message: "Contact is created.",
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const editContact = async(req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const details = req.body.details;
    
    try {
        const oneData = await contactSc.findByIdAndUpdate(id, {
            name, details
        })

        res.status(200).json({
            success: true,
            message: "Contact is updated",
            oneData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const getContact = async(req, res) => {
    try {
        const AllData = await contactSc.find({}).sort('-data')
        res.send({ AllData })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const deleteContact = async(req, res) => {
    const id = req.params.id;
    try {
        await contactSc.findByIdAndRemove(id);
        res.status(200).json({
            success: true,
            message: "Successfully Deleted."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const toggleContact = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;
    try {
        const oneData = await contactSc.findByIdAndUpdate(id, {
            "is_active": is_active,
        })

        res.status(200).json({
            success: true,
            message: "Status update",
            oneData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

module.exports = {
    postContact,
    editContact,
    getContact,
    deleteContact,
    toggleContact
}