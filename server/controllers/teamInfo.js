const teamInfoSc = require('../model/teamInfoSc');

const postTeamInfo = async(req, res) => {
    const {
        name, father_name, mother_name, phone,
    } = req.body;
    let empId = Math.floor(Math.random() * 10000)

    try {
        const data = await teamInfoSc.create({
            'empId': empId,
            name, father_name, mother_name, phone,
        })

        res.status(201).json({
            data
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const editTeamInfo = async(req, res) => {
    const id = req.params.id;
    const {
        name, father_name, mother_name, phone,
    } = req.body;

    try {
        const oneData = await teamInfoSc.findByIdAndUpdate(id, {
            name, father_name, mother_name, phone,
        })
        res.status(200).json({ oneData });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getTeamInfo = async(req, res) => {

    try {
        const AllData = await teamInfoSc.find({}).sort('-date');
        res.status(200).json({AllData});

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteTeamInfo = async(req, res) => {
    const id = req.params.id;

    try {
        await teamInfoSc.findByIdAndRemove(id);
        res.status(200).json({ message: 'Successfully Deleted'})

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const toggleTeamInfo = async(req, res) => {
    const id = req.params.id;
    const is_active = req.body.is_active;

    try {
        const oneData = await teamInfoSc.findByIdAndUpdate(id, {
            is_active
        })
        res.status(200).send(oneData);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const uploadEmpPic = async(req, res) => {

    if(req.file == undefined) {
        return;
    }

    const image = req.file.filename;

    try {
        res.status(200).send({file1: image})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const uploadEmpNid = async(req, res) => {
    if(req.file == undefined) {
        return;
    }

    const image = req.file.filename;

    try {
        res.status(200).send({file1: image})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    postTeamInfo,
    editTeamInfo,
    getTeamInfo,
    deleteTeamInfo,
    toggleTeamInfo,
    uploadEmpPic,
    uploadEmpNid
}