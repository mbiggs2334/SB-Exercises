const express = require('express');
const router = express.Router();
const middleware = require('./middleware');
const items = require('./fakeDb');

router.get('/', (req, res) => {
    if(items.length === 0){
        return res.json(['Your shopping cart is empty']);
    } else {
        return res.json(items);
    };
});

router.post('/', middleware.checkForGoodParams, (req, res) => {
    items.push({name: req.body.name, price: req.body.price});
    return res.json({"added": {"name": req.body.name, "price": req.body.price } });
});


router.get('/:name', middleware.checkForItem, (req, res) => {
    const itemQuery = items.find(o => o.name === req.params.name);
    if(itemQuery){
        return res.json(itemQuery);
    };
});


router.patch('/:name', middleware.checkForItem, (req, res) => {
    const itemQuery = items.find(o => o.name === req.params.name);
    const originalItemInfo = {...itemQuery};
    if(itemQuery){
        itemQuery.name = req.body.name;
        itemQuery.price = req.body.price;
        return res.json({ updated: { old: originalItemInfo, new: itemQuery } });
    };
});

router.delete('/:name', middleware.checkForItem, (req, res) => {
    const itemQuery = items.find(o => o.name === req.params.name);
    items.splice(items.indexOf(itemQuery), 1);
    if(items.indexOf(itemQuery) === -1 ){
        return res.json({message: `${req.params.name} deleted`});
    } else {
        return res.json({ message: 'There was a problem completing your request' });
    };
});

module.exports = router;