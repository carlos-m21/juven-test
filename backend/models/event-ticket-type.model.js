module.exports = (sequelize, type) => {
  return sequelize.define('event_ticket_type', {
    name: type.STRING,
    quantity_available: type.INTEGER
  }, {sequelize});
};
