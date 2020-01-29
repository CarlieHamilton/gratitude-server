const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// User Schema
const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String
}, {timestamps: true})
    // this pre hook ensures that updated passwords are hashed before storing
User.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return next()
    };
    bcrypt.hash(user.password, 10)
        .then((hashedPassword) => {
            user.password = hashedPassword;
            next();
        })
}, (err) => {
    next(err)
})

User.methods.comparePassword = (candidatePassword, next) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return next(err);
        next(null, isMatch)
    })
}

module.exports = mongoose.model("User", User)