const express = require('express');
const EventController = require('../controllers/event.controller');
const router = express.Router();

router.get('/all', EventController.getAllTickets);
router.post('/saveInitTickets', EventController.saveInitTickets);
router.post('/ticketCheckout', EventController.ticketCheckout);
router.get('/:url', EventController.getTicket);

module.exports = router;
