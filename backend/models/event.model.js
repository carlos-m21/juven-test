
module.exports = (sequelize, type) => {
  return sequelize.define('event', {
    url: {
      type: type.STRING,
      unique: true
    },
    name: type.STRING,
    banner_url: type.STRING,
    date: type.DATE,
    location: type.STRING,
    description: type.STRING
  }, {sequelize});
};
