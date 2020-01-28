const {
    chai,
    chaiHttp
} = require('../testConfig');
chai.use(chaiHttp);

const { generateToken } = require('../../utils/authUtils');
const User = require('../../models/user');

// setting up a mock user for testing
const setupMockUser = () => {
    const mockUser = {
        username: 'June',
        email: 'blessedBeTheFruit@gmail.com',
        password: 'praise_be'
    }
    return User.create(mockUser);
}

// get the user's token
const token = () => {
    setupMockUser()
        .then((mockUser) => {
            return generateToken(mockUser);
        })
}

module.exports = {
    setupMockUser,
    token
}