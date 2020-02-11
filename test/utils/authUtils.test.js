process.env.NODE_ENV = 'test';

const {
    chai,
    chaiHttp,
    expect,
    mongoose,
    app
} = require('../testConfig');
chai.use(chaiHttp);


const jwt = require('jsonwebtoken');

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
        it('should check to see if there is a valid token', async (done) => {
            // set up mock user
            const mockedUser = await setupMockUser()
            const username = mockedUser.username;
            const token = jwt.sign(
                { username: username },
                process.env.JWT,
                { expiresIn: '30s' }
            );
            const req = {
                headers: {
                Authorization: "Bearer " + token
            }}

            // console.log(req);

            // const res = {};
            // const next = function(err) {console.log('lala')}
            // // send the request
            // const result = await checkToken(req, res, next)
            //     .then(() => {
            //         console.log(res)
            //         expect(res.success).to.equal(false)
            //     }
            //     )
            //     .catch(
            //         console.log("error!!")
            //     )
            done();
        })
    })

    // check what happens if there is no valid token

    // generate a token for a user

    // extract just the token from a request

    // what happens if there is no token when trying to extract a token
})