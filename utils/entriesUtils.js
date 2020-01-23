const Entry = require("../models/entry");

const getAllEntries = req => {
    return Entry.find();
};

const getEntryById = req => {
    return Entry.findById(req.params.id);
};

const addEntry = req => {
    let date = Date.now();
    req.body.created_date = date;
    req.body.modified_date = date;
    return new Entry(req.body);
};

const deleteEntry = id => {
    return Entry.findByIdAndRemove(id)
};

const updateEntry = req => {
    req.body.modified_date = Date.now();
    return Entry.findByIdAndUpdate(req.params.id, req.body, {
        // "new: true" returns the updated entry rather than the original entry from when the query is executed
        new: true
    });
};

module.exports = {
    getAllEntries,
    getEntryById,
    addEntry,
    deleteEntry,
    updateEntry
}