const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

const { mongoose } = require('../config/mongooseConnection');
const { app } = require('../app');

module.exports = {
    chai,
    chaiHttp,
    expect,
    mongoose,
    app
}