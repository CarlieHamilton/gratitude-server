const mongoose = require('mongoose');

// select which database to connect to

const mongooseConnect = env => {
    if (env === 'test') {
        mongoose
            .connect('mongodb://localhost/gratitude-test', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(console.log('connected to the test database'))
            .catch(error => console.log(error))
    } else {
        mongoose
            .connect("mongodb://localhost/gratitude", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(console.log('connected to the development database'))
            .catch(error => console.log(error))
    }

    // This listens and logs any errors after the initial connection
    mongoose.connection.on('error', err => console.log(err))
}

module.exports = {
    mongooseConnect,
    mongoose
}