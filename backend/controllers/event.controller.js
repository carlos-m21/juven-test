const { Event, EventTicketType, EventGuest } = require('../sequelize');
const seed_data = require('../seed-data.json');

exports.saveInitTickets = (req, res, next) => {
  const async = require('async');
  Event.findAll().then(results => {
    if (results.length) {
      return res.send();
    } else {
      async.map(
        seed_data.events,
        (item, cb) => {
          Event.create(item, { include: [{ model: EventTicketType, as: 'ticket_types' }] }).then(created => {
            return cb(null, created);
          });
        },
        (err, results) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.send(results);
        }
      );
    }
  });
};

exports.getAllTickets = (req, res, next) => {
  console.log('get all tickets');
  Event.findAll({
    include: [
      {
        model: EventTicketType,
        as: 'ticket_types'
      }
    ]
  })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.getTicket = (req, res, next) => {
  Event.findOne({
    where: {
      url: `/${req.params.url}`
    },
    include: [
      {
        model: EventTicketType,
        as: 'ticket_types'
      }
    ]
  })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.ticketCheckout = (req, res, next) => {
  EventGuest.create(req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
