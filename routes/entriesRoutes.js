const express = require("express");
const router = express.Router();

const {
    getEntries,
    getEntry
} = require("../controllers/entriesController");

// GET on /entries
router.get("/", getEntries);

//  GET on /entries/:id
router.get("/:id", getEntry);

// POST on /entries

//  DELETE on /entries/:id

// PUT on /entries/:id

module.exports = router