const express = require("express");
const router = express.Router();

const {
    getEntries,
    getEntry,
    makeEntry,
    removeEntry,
    changeEntry
} = require("../controllers/entriesController");

// GET on /entries
router.get("/", getEntries);

//  GET on /entries/:id
router.get("/:id", getEntry);

// POST on /entries
router.post("/", makeEntry);

//  DELETE on /entries/:id
router.delete("/:id", removeEntry);

// PUT on /entries/:id
router.put("/:id", changeEntry);

module.exports = router