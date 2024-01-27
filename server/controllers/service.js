const ServiceSc = require('../model/serviceSc');

const postService = async(req, res) => {

    const { 
        service_id, 
        service_name, 
        base_price, 
        completion_time, 
    } = req.body;

    let a_id = Math.floor(Math.random() * 10000).toString()

    try {
        const AllData = await ServiceSc.create({
            'service_id': a_id,
            service_name,
            base_price,
            completion_time,
        })
        res.status(201).json({
            success: true, 
            AllData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const editService = async(req, res) => {
    const id = req.params.id;

    const { 
        service_id, 
        service_name, 
        base_price, 
        completion_time, 
    } = req.body;

    try {
        const oneData = await ServiceSc.findByIdAndUpdate(id, {
            service_id,
            service_name,
            base_price,
            completion_time,
        })

        res.status(200).json({
            success: true,
            oneData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getService = async(req, res) => {

    try {
        const AllData = await ServiceSc.find({}).sort('-date');

        res.status(200).json({
            success: true,
            AllData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteService = async(req, res) => {
    const id = req.params.id;

    try {
        await ServiceSc.findByIdAndRemove(id);
        res.status(200).json({
            success: true,
            message: 'Deleted'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const toggleService = async(req, res) => {
    const id = req.params.id;

    const is_active = req.body.is_active;

    try {
        const oneData = await ServiceSc.findByIdAndUpdate(id, {
            is_active
        })

        res.status(200).json({
            success: true,
            oneData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    postService,
    editService,
    getService,
    deleteService,
    toggleService,
}