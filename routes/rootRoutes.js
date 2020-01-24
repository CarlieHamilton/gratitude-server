const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("get on '/'");
    res.json({
        message: "Got Gratitude?"
    })
})

module.exports = router