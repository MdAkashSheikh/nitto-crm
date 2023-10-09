
const postDataSourc = async(req, res) => {
    try {
        res.send("HELLO POST DATA SOURCE")
    } catch (err) {
        res.status(400).send(err);
    }
}

const getData = async(req, res) => {
    res.send("Hello Word");
}

module.exports = {
    postDataSourc,
    getData,
}