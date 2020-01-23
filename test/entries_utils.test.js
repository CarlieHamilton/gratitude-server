process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

const { app } = require('../app');
const { mongoose } = require('../config/mongoose-connection');
const utilities = require("../utils/entries_utils");
const Entry = require('../models/entry');

let entryId = null;

describe('Entry Utility Tests', () => {

    after((done) => {
        Entry.deleteMany({}, (err) => {
        })
            .then(() => {
                mongoose.disconnect()
        })
        done();
    });

    // setting up test data before each test
    beforeEach(async () => {
        let entry = await setupMockEntry();
        entryId = entry._id;
    });

    afterEach((done) => {
        tearDownData().exec(() => done());
    });

    describe('')

})

const setupMockEntry = () => {
    let date = Date.now();
    let testEntry = new Entry({
        content: "Today I am grateful for 80s pop culture references",
        create_date: date,
        modified_date: date,
        username: "Marty McFly"
    });
    return Entry.create(testEntry);
}

const tearDownData = () => {
    return Entry.deleteMany();
}