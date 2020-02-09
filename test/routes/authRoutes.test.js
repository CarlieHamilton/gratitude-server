process.env.NODE_ENV = 'test'

const {
    chai,
    chaiHttp,
    expect,
    mongoose,
    app
} = require('../testConfig');
chai.use(chaiHttp);

const { setupMockUser, token } = require('../data/userTestMockData');

describe('Authorization Routes Tests', () => {

    before
})