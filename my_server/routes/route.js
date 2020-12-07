const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/users', (req, res) => {
  User.find(function (err, users) {
    res.json(users);
  })
});

router.post('/users', (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    street: req.body.street,
    zip: req.body.zip,
    username: req.body.username
  });
  newUser.save((err, user) => {
    if (err) {
      res.json({
        msg: 'Failed to add user'
      })
    } else {
      res.json({
        msg: 'User added successfully'
      })
    }
  });
});

router.delete('/users/:id', (req, res, next) => {
  User.remove({
    _id: req.params.id
  }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
