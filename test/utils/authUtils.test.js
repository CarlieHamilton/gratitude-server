process.env.NODE_ENV = 'test';

const {
    chai,
    chaiHttp,
    expect,
    mongoose,
    app
} = require('../testConfig');
chai.use(chaiHttp);

const {
    checkToken,
    generateToken,
    extractToken
} = require('../../utils/authUtils');
const User = require('../../models/user');
const {
    setupMockUser,
    token,
    userTearDownData
} = require('../data/userTestMockData');

let userId = null;

describe('Auth Utility Tests', () => {

    before(done => {
        mongoose.connection
            .then(done());
    })

    after(done => {
        User.deleteMany({}, (err) => {
        })
            .then(() => {
                // mongoose.disconnect()
            })
        done();
    })

    // check to see if there is a valid token
    describe('checkToken', () => {
        it('should check to see if there is a valid token', () => {
            // set up mock user
            // send the request
            // expect what do we expect? lol
        })
    })

    // check what happens if there is no valid token

    // generate a token for a user

    // extract just the token from a request

    // what happens if there is no token when trying to extract a token
})