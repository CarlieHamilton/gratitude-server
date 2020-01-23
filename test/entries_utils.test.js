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

    // getAllEntries
    describe('getAllEntries', () => {
        it('should get one post', async () => {
            let req = {
                query: {}
            };
            await utilities.getAllEntries(req).exec((err, entries) => {
                expect(Object.keys(entries).length).to.equal(1);
            });
        });

        it('the username of the first post should be MartyMcFly', async () => {
            let req = {
                query: {}
            };
            await utilities.getAllEntries(req).exec((err, entries )=> {
                expect(entries[0].username).to.equal('MartyMcFly')
            })
        })
    });

    // getEntryById
    describe('getEntryById', () => {
        it('the username should be MartyMcFly', async () => {
            let req = {
                params: {
                    id: entryId
                }
            }
            await (await utilities.getEntryById(req)).execPopulate((err, entry) => {
                expect(entry.username).to.equal('MartyMcFly')
            })
        })
    });

    // addEntry
    describe('addEntry', () => {
        it('should add an entry', async () => {
            const req = {
                body: {
                    content: "Could you be anymore happy today?",
                    username: "ChandlerBing",
                }
            }

            await utilities.addEntry(req).save((err, entry) => {
                expect(entry.content).to.equal(req.body.content);
            });
        });

        it('should fail if a required field is missing', async () => {
            const req = {
                body: {
                    content: "How you doin'?",
                    username: ""
                }
            }

            await utilities.addEntry(req).save((err, entry) => {
                if (err) {
                    expect(err.message).to.match(/validation/);
                } else {
                    expect(true).to.eq(false);
                }
            })
        })
    });

    // deleteEntry
    describe('deleteEntry', () => {
        it('should delete the post specified', async () => {
            await utilities.deleteEntry(entryId).exec();
            await Entry.findById(entryId).exec((err, entry) => {
                expect(entry).to.eq(null);
            })
        })
    });

    // updateEntry
    describe('updateEntry', () => {
        it('should update the entry', async () => {
            const req = {
                params: {
                    id: entryId
                },
                body: {
                    content: "Great Scott!",
                    username: "MartyMcFly"
                }
            }

            await utilities.updateEntry(req).exec((err, entry) => {
                expect(entry.content).to.equal(req.body.content)
            })
        })
    })
})

const setupMockEntry = () => {
    let date = Date.now();
    let testEntry = new Entry({
        content: "Today I am grateful for 80s pop culture references",
        create_date: date,
        modified_date: date,
        username: "MartyMcFly"
    });
    return Entry.create(testEntry);
}

const tearDownData = () => {
    return Entry.deleteMany();
}