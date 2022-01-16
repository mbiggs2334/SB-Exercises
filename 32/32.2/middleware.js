const items = require('./fakeDb');

function checkForGoodParams(req, res, next){
    let incorrectParams = [];
    let error = new Error();
    error.status = 400;
    if(req.body.name === undefined){
        incorrectParams.push('name');
    };
    if(req.body.price === undefined){
        incorrectParams.push('price');
    };
    if(incorrectParams.length > 0){
        error.message = `ERROR: '${incorrectParams.toString()}' parameter(s) not found. Please use the correct parameter(s)`;
        throw error;
    };
    return next();
};

function checkForItem(req, res, next){
    let item = items.find(o => o.name === req.params.name);
    if(item !== undefined){
        return next();
    };
    return res.json({message: `${req.params.name} not found`});
};

module.exports = {
    checkForGoodParams,
    checkForItem
}