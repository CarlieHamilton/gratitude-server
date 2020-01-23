const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Entry Schema
const Entry = new Schema({
    content: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    },
    modified_date: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Entry", Entry)