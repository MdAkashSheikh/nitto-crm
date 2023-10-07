require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DB_CONN)
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello Server")
})

app.listen('5001', () => {
    console.log('listening on port:5001');
})