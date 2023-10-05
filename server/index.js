const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Server")
})

app.listen('5001', () => {
    console.log('listening on port:5001');
})