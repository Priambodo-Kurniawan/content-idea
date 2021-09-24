const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_JWT;

function generateToken(payload) {
  return jwt.sign(payload, SECRET);
}

module.exports = { generateToken };
