process.env.NODE_ENV = 'test'

const {
    chai,
    chaiHttp,
    expect,
    mongoose,
    app
} = require('../testConfig');
chai.use(chaiHttp);
