const express = require('express');
var router = express.Router();
var Order = require('../models/item');
var helper = require('../helpers/helper');

// => localhost:3080/api/orders
router.get('/', helper.verifyToken, (req, res) => {
  Order.find().then(orders => {
    res.json(orders);
  }).catch(err => {
    res.json({
      msg: 'Failed to find orders',
      err: err
    });
    console.log('Failed to find orders: ' + JSON.stringify(err, undefined, 2));
  })
})

// => localhost:3080/api/orders
router.post('/', (req, res) => {
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

// => localhost:3080/api/orders/users/:id
router.get('users/:id', helper.verifyToken, (req, res) => {
  Order.find({
    userId: req.params.id
  }).then(orders => {
    if (orders) {
      res.json(orders);
    } else {
      return res.status(501).json({
        message: 'Orders not found'
      })
    }
  }).catch(err => {
    res.json({
      msg: 'Failed to find the orders',
      err: err
    });
    console.log('Failed to find the orders: ' + JSON.stringify(err, undefined, 2))
  })
})

function getModelFromRequest(reqBody) {
  let order = new Order({
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
  return order;
}

module.exports = router;
