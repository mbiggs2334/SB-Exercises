const express = require('express');
const NumbersArray = require('./number');

const app = express();

app.use((req, res, next) => {
    if(!req.query['nums']) return res.status(400).json({msg:`INVALID PARAMETER: 'nums' is the required parameter.`});
    next();
});

app.get('/mean', (req, res, next) => {
    let numArray = new NumbersArray(req.query['nums']);
    return res.json({operation: 'mean', value: numArray.mean});
});

app.get('/median', (req, res, next) => {
    let numArray = new NumbersArray(req.query['nums']);
    return res.json({operation: 'median', value: numArray.median});
});

app.get('/mode', (req, res, next) => {
    let numArray = new NumbersArray(req.query['nums']);
    return res.json({operation: 'mode', value: numArray.mode});
});

app.get('/all', (req, res) => {
    let numArray = new NumbersArray(req.query['nums']);
    return res.json({
        operation: 'all',
        mean: numArray.mean,
        median: numArray.median,
        mode: numArray.mode
    });
});

app.use((error, req, res, next) => {
    return res.status(error.status).json({msg: error.message})
});

app.listen('5000', () => {
    console.log('Server Started');
});