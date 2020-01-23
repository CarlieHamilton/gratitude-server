const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongooseConnect } = require('./config/mongoose-connection');

// Routes
const entriesRouter = require("./routes/entries_routes");

// Environment Variables
if (process.env.NODE_ENV !== 'production' ){
    require('dotenv').config()
}

const port = process.env.PORT || 3003;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongooseConnect(process.env.NODE_ENV);

// Defining the routes
app.get("/", (req, res) => {
    console.log("get on "/"");
    res.send("Got Gratitude?");
})
app.use("/entries", entriesRouter);

// server listening
app.listen(port, () => {
    console.log(`Gratitude - server listening on port ${port}`)
})

// export app
module.exports = {
    app
}