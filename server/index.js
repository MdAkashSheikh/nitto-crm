require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routeAll = require('./routes/route')
const errorHandler = require('./middleware/errorMiddleware')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 6300

mongoose.connect(process.env.DB_CONN)
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello Server")
})

app.use(routeAll);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})