const Entry = require("../models/entry");

const date = Date.now()

const entries = [
    {
        content: "Today I am grateful that Theo could go to school and I could go to work. That I could work on this website and get paid for it. That Rory messaged me this morning. ",
        created_date: date,
        modified_date: date,
        username: "Carlie"
    }
]

const seedEntries = () => {
    Entry.collection.insertMany(entries)
        .then((result) => {
            console.log("result:", result);
            result.status(200).json({ 'success': 'new entries seeded', 'data': result});
        })
        .catch(err => {
            console.error("error", err);
            result.status(400).json({err});
        })

}

module.exports = {
    seedEntries
}