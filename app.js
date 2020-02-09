const express = require('express');
const cors = require("cors");
const { mongooseConnect } = require('./config/mongooseConnection');
const { login, index } = require('./controllers/authController');
const { checkToken } = require('./utils/authUtils')

// Routes
const rootRouter = require("./routes/rootRoutes");
const entriesRouter = require("./routes/entriesRoutes");

// Environment Variables
if (process.env.NODE_ENV !== 'production' ){
    require('dotenv').config()
}

const port = process.env.PORT || 3003;

const app = express();
app.use(cors());
app.use(express.json());
// TODO : - delete body parser from package.json
// Database connection
mongooseConnect(process.env.NODE_ENV);

// // seed the database
// const { seedEntries } = require('./data/entrySeeds');
// seedEntries();

// Defining the routes
app.use("/", rootRouter);
app.use("/entries", entriesRouter);
app.post('/login', login);

// server listening
app.listen(port, () => {
    console.log(`Gratitude - server listening on port ${port}`)
})

// export app
module.exports = {
    app
}