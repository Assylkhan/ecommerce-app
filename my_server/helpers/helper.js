var jwt = require('jsonwebtoken');
var decodedToken = '';
const TOKEN_KEY = 'secretKeyNeedsStrongerOne';

function verifyToken(req, res, next) {
  console.log('req.header')
  console.log(req.header('Authorization'))
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
module.exports.TOKEN_KEY = TOKEN_KEY;
