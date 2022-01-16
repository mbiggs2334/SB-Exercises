const express = require('express');
const app = new express();
const itemRoutes = require('./itemsRouter');

app.use(express.json());

app.use('/items', itemRoutes);




app.use((error, req, res, next) => {
    return res.status(error.status).json({msg: error.message});
});

module.exports = app;