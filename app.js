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

// request('https://nut-case.s3.amazonaws.com/jobs.json', {}, (err, resp, body) => {
//         if (err) { return console.log(err); }
//         if(body)
//         {
//             try {
//                 index.clearIndex((err, content)=>{
//                     if(err) {console.log("err", err)}
//                     if(content)
//                     {
//                     body= JSON.parse(body);
//                         async.forEachSeries(body.data, (data, cb)=>{
//                             index.addObjects([data], function(err, content) {
//                                 console.log("err", err, content)
//                                 cb();
//                             });
//                         },()=>{
//                             console.log("sucees")
//                         })
//                    }
//                 })
//             }
//             catch (e) {
//                 console.log("err", e)
//             }
//         }
//     });

apiControllers(app);

const server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Server started at     ', new Date().toString());
    console.log('listening at http://%s:%s     ', host, port);
});