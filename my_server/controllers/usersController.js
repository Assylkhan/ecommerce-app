const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
  User
} = require('../models/user');

// => localhost:3080/api/users/
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
  let newUser = getModelFromRequest(req.body);
  newUser.save().then((user) => {
    res.json(user)
  }).catch((err) => {
    res.json({
      msg: 'Failed to add the user',
      err: err
    })
    console.log('Failed to add the user: ' + JSON.stringify(err, undefined, 2))
  })
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  let user = getModelFromRequest(req.body);
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true
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
router.delete('/:id', (req, res, next) => {
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
    password: reqBody.password,
    country: reqBody.country,
    state: reqBody.state,
    city: reqBody.city,
    street: reqBody.street,
    zip: reqBody.zip
  });
  return user;
}

module.exports = router;
