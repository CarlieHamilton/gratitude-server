const {
    getAllEntries,
    getEntryById,
    addEntry,
    deleteEntry,
    updateEntry
} = require('../utils/entriesUtils');

const getEntries = (req, res) => {
    getAllEntries(req)
        .sort({
            modified_date: -1
        })
        .exec((err, entries) => {
            if (err) {
                res.status(500);
                res.json({
                    error: err.message
                });
            }
            res.send(entries);
        });
};

const getEntry = (req, res) => {
    getEntryById(req).exec((err, entry) => {
        if (err) {
            res.status(404);
            res.send("Entry not found");
        }
        res.send(entry);
    });
};

const makeEntry = (req, res) => {
    addEntry(req).save((err, entry) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            })
        }
        res.status(201);
        res.send(entry);
    });
};

const removeEntry = (req, res) => {
    deleteEntry(req.params.id).exec((err) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.sendStatus(204);
    });
};

const changeEntry = (req, res) => {
    updateEntry(req).exec((err, entry) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.status(200);
        res.send(post);
    });
};

module.exports = {
    getEntries,
    getEntry,
    makeEntry,
    removeEntry,
    changeEntry
};