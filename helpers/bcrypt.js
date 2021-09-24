const bcrypt = require("bcrypt");

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function checkPassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  hashPassword,
  checkPassword,
};
