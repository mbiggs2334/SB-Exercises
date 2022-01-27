const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require('../expressError');
const { getDate } = require('../functions');

router.get('/', async(req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM invoices`);
        return res.json({invoice: results.rows})
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.get('/:id', async(req, res, next) => {
    try {
        const invoiceResults = await db.query(`SELECT * FROM invoices
                                        WHERE id=$1`, [req.params.id]);
        const companyResults = await db.query(`SELECT * FROM companies
                                                WHERE code=$1`, [invoiceResults.rows[0].comp_code]);
        if(invoiceResults.rows.length > 0){
            return res.json({invoice: invoiceResults.rows, company: companyResults.rows});
        } else {
            res.statusCode = 404;
            return res.json({404: `Invoice with ID ${req.params.id} not found`});
        };
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.post('/', async(req, res, next) => {
    try {
        const results = await db.query(`INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
                                        VALUES ($1, $2)
                                        RETURNING comp_code, amt`, 
                                        [req.body.comp_code, req.body.amt]);
        res.statusCode = 201;
        return res.json({invoice: results.rows});
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    }
});

router.put('/:id', async(req, res, next) => {
    try{
        let results;
        const { amt, paid } = req.body;
        if(paid === 'true' || paid === true){
            results = await db.query(`UPDATE invoices SET amt=$1, paid=$2, paid_date=$3
                                        WHERE id=$4
                                        RETURNING comp_code, amt, paid, add_date, paid_date`, 
                                        [amt, paid, getDate(), req.params.id]);
        } else if(paid === 'false' || paid === false) {
            results = await db.query(`UPDATE invoices SET amt=$1, paid=$2, paid_date=$3
                                        WHERE id=$4
                                        RETURNING comp_code, amt, paid, add_date, paid_date`, 
                                        [amt, false, null, req.params.id]);
        } else {
            results = await db.query(`UPDATE invoices SET amt=$1
                                        WHERE id=$2
                                        RETURNING comp_code, amt, paid, add_date, paid_date`, 
                                        [amt, req.params.id]);
        };
        if(results.rows.length === 0){
            throw new ExpressError('Invoice not found', 404);
        };
        return res.json(results.rows);
    } catch {
        const err = new ExpressError("Something went wrong.", 500);
        return next(err);
    };
});

router.delete('/:id', async(req, res, next) => {
    try {
        const results = await db.query(`DELETE FROM invoices
                                        WHERE id=$1`,
                                        [req.params.id]);
        return res.json({message: `Invoice ${req.params.id} deleted`})
    } catch {

    };
});

module.exports = router;