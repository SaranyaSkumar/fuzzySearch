var bodyParser = require('body-parser');
const path = require('path');
var request = require('request');
const fuzzy = require('fuzzy');
const algoliasearch = require('algoliasearch')
var client = algoliasearch('4TX06DTB2K', '74a5ef841adf2d30ebf0a841c8a9703a');
var index = client.initIndex('data');
const async = require('async');

module.exports = function (app, passport) {
    let dataSet;

    app.get('/', function (req, res) {
        console.log("api", __dirname, path.resolve());
        res.sendFile(path.resolve() + '/public/index.html');
    });

    app.get('/data', async function (req, res) {
        var postData= req.query;
        var jobData;
        if(dataSet && dataSet.length>0) {
            console.log("data pre")
            jobData= dataSet;
        }
        else {
            console.log("fetch fr api")
            jobData = await getData().catch((err) => {
                res.json({ message: "something went worng" })
            });
            jobData=jobData.data;
        }
        if (jobData) {
            if(postData.query)
            {
                const options = {
                    extract: (el) => {
                        if (typeof el == 'string') {
                            return el;
                        } else {
                            return el.title
                        }
                    }
                };
                let results = fuzzy.filter(postData.query, jobData, options);
                //results = results.slice(0, 8);
                let finalData=[];
                async.forEachSeries(results, (data, cb) => {
                    finalData.push(data.original)
                    cb();
                },()=>{
                    dataSet= finalData;
                    res.json(finalData);
                });
            }
            else {
                dataSet= jobData;
                //results=jobs.slice(0, 8);
                res.json(jobData);
            }
        }
    });

    app.get('/location', async function (req, res) {
        const postData= req.query;
        console.log("postdata", postData);
        var jobData;
        if(dataSet && dataSet.length>0) {
            console.log("data pre")
            jobData= dataSet;
        }
        else {
            console.log("fetch fr api")
            jobData = await getData().catch((err) => {
                res.json({ message: "something went worng" })
            });
            jobData=jobData.data;
        }
        if (jobData) {
            let results;
            if(postData.query)
            {
                const options = {
                    extract: (el) => {
                        if (typeof el == 'string') {
                            return el;
                        } else {
                            return el.location
                        }
                    }
                };
                let results = fuzzy.filter(postData.query, jobData, options);
                //results = results.slice(0, 8);
                let finalData=[];
                async.forEachSeries(results, (data, cb) => {
                    finalData.push(data.original)
                    cb();
                },()=>{
                    res.json(finalData);
                });
            }
            else {
                //results=jobs.slice(0, 8);
                res.json(jobData);
            }
        }
    });

    app.get('/skills', async function (req, res) {
        const postData= req.query;
        var jobData;
        if(dataSet && dataSet.length>0) {
            jobData= dataSet;
        }
        else {
            jobData = await getData().catch((err) => {
                res.json({ message: "something went worng" })
            });
            jobData=jobData.data;
        }
        if (jobData) {
            if(postData.query)
            {
                const options = {
                    extract: (el) => {
                        if (typeof el == 'string') {
                            return el;
                        } else {
                            return el.skills
                        }
                    }
                };
                let results = fuzzy.filter(postData.query, jobData, options);
                //results = results.slice(0, 8);
                let finalData=[];
                async.forEachSeries(results, (data, cb) => {
                    finalData.push(data.original)
                    cb();
                },()=>{
                    res.json(finalData);
                });
            }
            else {
                //results=jobs.slice(0, 8);
                res.json(jobData);
            }
        }
    });

    app.get('/company', async function (req, res) {
        const postData= req.query;
        var jobData;
        if(dataSet && dataSet.length>0) {
            console.log("data pre")
            jobData= dataSet;
        }
        else {
            jobData = await getData().catch((err) => {
                res.json({ message: "something went worng" })
            });
            jobData=jobData.data;
        }
        if (jobData) {
            if(postData.query)
            {
                const options = {
                    extract: (el) => {
                        if (typeof el == 'string') {
                            return el;
                        } else {
                            return el['companyname']
                        }
                    }
                };
                let results = fuzzy.filter(postData.query, jobData, options);
                //results = results.slice(0, 8);
                let finalData=[];
                async.forEachSeries(results, (data, cb) => {
                    finalData.push(data.original)
                    cb();
                },()=>{
                    res.json(finalData);
                });
            }
            else {
                res.json(jobData);
            }
        }
    });

    function getData() {
        return new Promise((resolve, reject) => {
            try {
                request('https://nut-case.s3.amazonaws.com/jobs.json', {}, (err, resp, body) => {
                    body = JSON.parse(body);
                    if (body) {
                        resolve(body);
                    }
                    else {
                        reject(false);
                    }
                });
            }
            catch (err) {
                reject(false);
            }
        });
    }


    /*app.get('/data/search', async function (req, res) {
        const postData = req.query;
        console.log("req", req)
        console.log("postData", postData)
        let jobData = await getData().catch((err) => {
            return res.json({ message: "something went worng" })
        });
        if (jobData) {
            if(postData.title)
            {
                const options = {
                    extract: (el) => {
                        if (typeof el == 'string') {
                            return el;
                        } else {
                            return el.title
                        }
                    }
                };
                let dataResult = fuzzy.filter(postData.title, jobData, options);
                res.json(dataResult)
            }
        }
    });*/

}