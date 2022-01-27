const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const slugify = require('slugify');

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
        const results = await db.query(`
            SELECT c.code, c.name, c.description, i.industry
            FROM companies AS c
            LEFT JOIN company_industries as ci
            ON c.code = ci.comp_code
            LEFT JOIN industries as i
            ON ci.indus_code = i.code
            WHERE c.code = $1;`, [req.params.company]);
        const invoices = await db.query(`SELECT * FROM invoices WHERE comp_code=$1`, [req.params.company]);
        const { code, name, description } = results.rows[0];
        const industries = results.rows.map(r => r.industry);
        if(results.rows.length === 0){
            return res.json({404: `${req.params.company} not found.`});
        };
        return res.json({company: [{code, name, description, industries}], invoices: invoices.rows});
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.post('/', async(req, res, next) => {
    const { name, description } = req.body;
        const slug = slugify(name, {
            replacement: '-',
            lower: true,
            remove: /[*+~.()'"!:@]/g
        });
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);
        res.statusCode = 201;
        return res.json({company: results.rows[0]});
    try {
        const { name, description } = req.body;
        const code = slugify(name, {
            replacement: '-',
            lower: true,
            remove: /[*+~.()'"!:@]/g
        });
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);
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