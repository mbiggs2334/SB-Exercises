const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const slugify = require('slugify');


router.get('/', async (req, res, next) => {
    try {
        const indus = await db.query(`
        SELECT i.industry FROM industries AS i`);
        const results = await db.query(`
        SELECT i.industry, c.code
        FROM companies AS c
        INNER JOIN company_industries as ci
        ON ci.comp_code = c.code
        INNER JOIN industries as i
        ON i.code = ci.indus_code
        `);
        const response = {};
        indus.rows.forEach(v => {
            if(response[v.industry] === undefined){
                response[v.industry] = [];
            };
        });
        results.rows.forEach(v => {
            response[v.industry].push(v.code);
        });
        return res.json(response);
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.post('/new', async (req, res, next) => {
    try {
        const { code, industry } = req.body
        const results = await db.query(`
        INSERT INTO industries (code, industry)
        VALUES ($1, $2)
        RETURNING code, industry`, [code, industry]);
        return res.json(results.rows[0]);
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.post('/ci', async (req, res, next) => {
    try {
        const { company_code, industry_code } = req.body;
        const results = await db.query(`
        INSERT INTO company_industries (comp_code, indus_code)
        VALUES ($1, $2)
        RETURNING comp_code, indus_code`, [company_code, industry_code]);
        return res.json(results.rows[0]);
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});





module.exports = router;