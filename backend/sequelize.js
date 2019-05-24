const Sequelize = require('sequelize');
const EventModel = require('./models/event.model');
const EventTicketTypeModel = require('./models/event-ticket-type.model');
const EventGuestModel = require('./models/event-guest.model');

const sequelize = new Sequelize('juven_test', process.env.mysql_user, process.env.mysql_password, {
  host: process.env.mysql_host,
  port: process.env.mysql_port,
  dialect: 'mariadb'
});

const Event = EventModel(sequelize, Sequelize);
const EventTicketType = EventTicketTypeModel(sequelize, Sequelize);
const EventGuest = EventGuestModel(sequelize, Sequelize);

Event.hasMany(EventTicketType, { as: 'ticket_types' });
EventTicketType.belongsTo(Event);
EventGuest.belongsTo(Event);

sequelize.sync({ force: false }).then(result => {
  console.log(`Database & tables created!`);
  return true;
});

module.exports = {
  Event,
  EventTicketType,
  EventGuest
};
