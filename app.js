const express = require('express');
const app = express();
const path = require('path');
var apiControllers = require('./controllers/apicontrollers');
var request = require('request');
const fuzzy = require('fuzzy');
const algoliasearch = require('algoliasearch')
var client = algoliasearch('4TX06DTB2K', '74a5ef841adf2d30ebf0a841c8a9703a');
var index = client.initIndex('data');
const async = require('async')


const port = process.env.PORT || 5000;
app.set('port', port);



apiControllers(app);

const server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server started at     ', new Date().toString());
    console.log('listening at http://%s:%s     ', host, port);
});