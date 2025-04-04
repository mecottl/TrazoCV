const express = require('express');
const config = require('./config');

const app = express();

app.set('port', config.app.port);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


module.exports = app;