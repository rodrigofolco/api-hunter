'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const users = require('../src/features/users/user.controller');
const bonds = require('../src/features/bonds/bond.controller');
const cors = require('cors');


const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/v1/users', users);
app.use('/v1/bonds', bonds);

app.use(cors({origin: '*'}));

module.exports = app;