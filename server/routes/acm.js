const express = require('express');
const ticketingPad = require('../controllers/ticketingPad');
const bookingPad = require('../controllers/bookingPad');

const router = express.Router();

// get all the rules
router.get('/rules/ticketing', async (req, res, next) => {
    try {
        const rules = await ticketingPad.getRules(req.query);
        res.json(rules.data);
    } catch (e) {
        // this will eventually be handled by your error handling middleware
        next(e);
    }
});

// get all the rules
router.get('/rules/booking', async (req, res, next) => {
    try {
        const rules = await bookingPad.getRules(req.query);
        res.json(rules.data);
    } catch (e) {
        // this will eventually be handled by your error handling middleware
        next(e);
    }
});

router.put('/rules/booking', async (req, res, next) => {
    try {
        const response = await bookingPad.updateRule(req.body);
        res.json(response.data);
    } catch (e) {
        // this will eventually be handled by your error handling middleware
        next(e);
    }
});

module.exports = router;
