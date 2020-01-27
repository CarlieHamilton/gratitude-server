process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;
const should = chai.should();

const { mongoose } = require("../../config/mongooseConnection");
const { app } = require("../../app");
const Entry = require("../../models/entry");
const {
    setupMockEntry,
    entryTearDownData
} = require('../data/testMockData');

let entryId = null;

describe('Entry Routes Tests', () => {

    before((done) => {
        mongoose.connection
            .then(done())
    })

    after((done) => {
        Entry.deleteMany({}, err => {
        })
            .then(() => {
                // mongoose.disconnect()
        })
        done();
    })

    beforeEach(async () => {
        let entry = await setupMockEntry();
        entryId = entry._id;
    });

    afterEach((done) => {
        entryTearDownData().exec(() => done());
    })

    // GET route
    describe('GET  entries/', () => {
        it('should GET all entries', (done) => {
            chai.request(app)
                .get('/entries')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    res.body[0].username.should.be.eql("MartyMcFly");
                })
            done();
        })
    });

    // GET entries/:id
    describe("GET entries/:id", () => {
        it('should GET a single entry when given an ID', (done) => {
            chai.request(app)
                .get('/entries/' + entryId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                })
            done();
        })
    })


    // POST entries/
    describe("POST entries/", () => {
        it('should POST a new entry', (done) => {
            let newEntry = {
                content: "I am grateful that I'm a teapot",
                username: "Roarz"
            }

            chai.request(app)
                .post('/entries')
                .send(newEntry)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    res.body.username.should.eql('Roarz');
                })
            done();
        });

        it('should not POST an entry where the content is blank', (done) => {
            let entryWithNoContent = {
                content: "",
                username: "Carlie"
            }

            chai.request(app)
                .post('/entries')
                .send(entryWithNoContent)
                .end((err, res) => {
                    res.should.have.status(500);
                })
            done();
        })
    });

    // PUT entries/:id
    describe('PUT entries/:id', () => {
        it('should UPDATE an entry when given an id', (done) => {
            let updatedEntry = {
                content: "updated content",
                author: "MartyMcFly"
            }

            chai.request(app)
                .put('/entries/' + entryId)
                .send(updatedEntry)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('content').eql('updated content')
                })
            done();
        })
    })

    // DELETE entries/:id
    describe('DELETE entries/:id', () => {
        it('should delete an entry when an id is given', (done) => {
            chai.request(app)
                .delete('/entries/' + entryId)
                .end((err, res) => {
                    res.should.have.status(204);
                })
            done();
        })

        // this isn't working yet`
        it('should return an error if an invalid id is given', (done) => {
            chai.request(app)
                .delete('/entries/' + 42)
                .end((err, res) => {
                    if (err) {
                        console.log(err)
                    }
                })
            done();
            })
    })
})