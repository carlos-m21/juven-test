module.exports = (sequelize, type) => {
  return sequelize.define('event_guest', {
    fname: type.STRING,
    lname: type.STRING,
    email: type.STRING,
    phone: type.STRING
  }, {sequelize});
};
