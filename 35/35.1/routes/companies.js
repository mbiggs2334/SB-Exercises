const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');

router.get('/', async(req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({companies: results.rows});
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    }
});


router.get('/:company', async(req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies WHERE code=$1`, [req.params.company]);
        const invoices = await db.query(`SELECT * FROM invoices WHERE comp_code=$1`, [req.params.company]);
        if(results.rows.length > 0){
            return res.json({company: results.rows[0], invoices: invoices.rows});
        } else {
            return res.json({404: `${req.params.company} not found.`});
        };
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.post('/', async(req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [req.body.code, req.body.name, req.body.description]);
        res.statusCode = 201;
        return res.json({company: results.rows[0]});
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.put('/:company', async(req, res, next) => {
    try {
        const results = await db.query(`UPDATE companies SET code=$2, name=$3, description=$4
                                        WHERE code=$1
                                        RETURNING code, name, description`,
                                        [req.params.company, req.body.code, req.body.name, req.body.description]);
        if(results.rows.length > 0){
            return res.json({company: results.rows[0]});
        } else {
            res.statusCode = 404;
            return res.json({404: `Company code '${req.params.company}' not found`});
        };
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.delete('/:company', async(req, res, next) => {
    try {
        const results = await db.query(`DELETE FROM companies
                                        WHERE code=$1`, [req.params.company]);
        if(results.rows.length > 0){
            return res.json({company: results.rows[0]});
        } else {
            res.statusCode = 404;
            return res.json({404: `Company code '${req.params.company}' not found`});
        };
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    }
});


module.exports = router;