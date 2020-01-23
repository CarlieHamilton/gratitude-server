process.env.NODE_ENV = "test";

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

const { app } = require('../app');
const { mongoose } = require('../config/mongoose-connection');

describe('Mongoose connection tests', () => {
    describe('test vs dev database connection', () => {
        it('checks mongoose has connected to the test database', (done) => {
            chai.request(app)
            expect(mongoose.connection.name === 'gratitude-test')
            done()
        })

        it('should connect to dev database when NODE_ENV !== test', (done) => {
            NODE_ENV = "dev"
            chai.request(app)
            expect(mongoose.connection.name === 'gratitude')
            done()
            NODE_ENV = 'test'
        });
    })
})