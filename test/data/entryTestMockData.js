const Entry = require("../../models/entry");

const setupMockEntry = () => {
    let date = Date.now();
    let testEntry = new Entry({
        content: "Today I am grateful for 80s pop culture references",
        created_date: date,
        modified_date: date,
        username: "MartyMcFly"
    })
    return Entry.create(testEntry);
}

const entryTearDownData = () => {
    return Entry.deleteMany();
}

module.exports = {
    setupMockEntry,
    entryTearDownData
}