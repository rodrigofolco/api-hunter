'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const users = require('../src/features/users/user.controller');
const bonds = require('../src/features/bonds/bond.controller');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/v1/users', users);
app.use('/v1/bonds', bonds);

module.exports = app;