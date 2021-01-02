var jwt = require('jsonwebtoken');
var decodedToken = '';

function verifyToken(req, res, next) {
  let token = req.header('Authorization');

  jwt.verify(token, TOKEN_KEY, (err, tokendata) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized request'
      })
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports.decodedToken = decodedToken;
module.exports.verifyToken = verifyToken;

