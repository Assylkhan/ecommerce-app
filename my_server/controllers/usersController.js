const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../models/user');
var jwt = require('jsonwebtoken');
const TOKEN_KEY = 'secretKeyNeedsStrongerOne';

// => localhost:3080/api/users/
router.get('/', verifyToken, (req, res) => {
  User.find().then(users => {
    res.json(users);
  }).catch(err => {
    res.json({
      msg: 'Failed to find users',
      err: err
    });
    console.log('Failed to find users: ' + JSON.stringify(err, undefined, 2));
  })
})

// => localhost:3080/api/users/:id
router.get('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  User.findById(req.params.id).then(user => {
    res.json(user)
  }).catch(err => {
    res.json({
      msg: 'Failed to find the user',
      err: err
    });
    console.log('Failed to find the user: ' + JSON.stringify(err, undefined, 2))
  })
});

// => localhost:3080/api/users/
router.post('/', verifyToken, (req, res) => {
  let newUser = getModelFromRequest(req.body);
  newUser.save().then((user) => {
    res.status(201).json(user)
  }).catch((err) => {
    res.status(501).json({
      msg: 'Failed to add the user',
      err: err.message
    })
    console.log('Failed to add the user: ' + JSON.stringify(err, undefined, 2))
  })
});

// => localhost:3080/api/users/login
router.post('/login', (req, res) => {
  User.findOne({
    email: req.params.email
  }).then(user => {
    if (user) {
      if (user.isValid(req.params.password)) {
        // generate token
        let token = jwt.sign({
          email: req.params.email
        }, TOKEN_KEY, {
          expiresIn: '3h'
        })
        return res.status(200).json(token);
      } else {
        return res.status(501).json({
          message: 'Invalid credentials'
        })
      }
    } else {
      return res.status(501).json({
        message: 'User email is not registered'
      })
    }
  }).catch(err => {
    res.json({
      msg: 'Failed to find the user',
      err: err
    });
    console.log('Failed to find the user: ' + JSON.stringify(err, undefined, 2))
  })
});

// // verifyToken is a middleware function
// router.get('/email', verifyToken, (req, res, next) => {
//   res.status(200).json(decodedToken.email);
// });

var decodedToken = '';

function verifyToken(req, res, next) {
  req.header()
  let token = req.query.token;

  jwt.verify(token, TOKEN_KEY, (err, tokendata) => {
    if (err) {
      return res.status(400).json({
        message: 'Unauthorized request'
      })
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

router.put('/:id', verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  let user = getModelFromRequest(req.body);
  User.findByIdAndUpdate(req.params.id, {
    $set: user
  }, {
    new: true
  }).then(user => {
    res.json(user);
  }).catch(err => {
    res.json({
      msg: 'Failed to update the user',
      err: err
    });
    console.log('Failed to update the user: ' + JSON.stringify(err, undefined, 2));
  })
});

// => localhost:3080/api/users/:id
router.delete('/:id', verifyToken, (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  User.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.send('User deleted')
  }).catch((err) => {
    res.json(err);
    console.log('Failed to remove the user: ' + JSON.stringify(err, undefined, 2));
  });
});

function getModelFromRequest(reqBody) {
  let user = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    password: User.hashPassword(reqBody.password),
    country: reqBody.address.country,
    state: reqBody.address.state,
    city: reqBody.address.city,
    street: reqBody.address.street,
    zip: reqBody.address.zip
  });
  return user;
}

module.exports = router;
