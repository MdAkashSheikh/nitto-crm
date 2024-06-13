
const postContact = async(req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}

const editContact = async(req, res) => {

}

const getContact = async(req, res) => {

}

const deleteContact = async(req, res) => {

}

const toggleContact = async(req, res) => {

}

module.exports = {
    postContact,
    editContact,
    getContact,
    deleteContact,
    toggleContact
}