const express = require('express');
var router = express.Router();
var Order = require('../models/item');
var Billing = require('../models/billing');
var Shipping = require('../models/shipping');
var helper = require('../helpers/helper');

// => localhost:3080/api/orders
router.get('/', helper.verifyToken, (req, res) => {
  Order.find().then(orders => {
    res.status(201).json(orders);
  }).catch(err => {
    res.status(501).json({
      msg: 'Failed to find orders',
      err: err
    });
    console.log('Failed to find orders: ' + JSON.stringify(err, undefined, 2));
  })
})

// => localhost:3080/api/checkout
router.post('/checkout', (req, res) => {
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

// => localhost:3080/api/orders
router.post('/', (req, res) => {
  let newOrder = getModelFromRequest(req.body);
  newOrder.save().then((order) => {
    res.status(201).json(order)
  }).catch((err) => {
    res.status(501).json({
      msg: 'Failed to add the order',
      err: err.message
    })
    console.log('Failed to add the order: ' + JSON.stringify(err, undefined, 2))
  })
});

// => localhost:3080/api/orders/users/:id
router.get('users/:id', helper.verifyToken, (req, res) => {
  Order.find({
    userId: req.params.id
  }).then(orders => {
    if (orders) {
      res.status(201).json(orders);
    } else {
      return res.status(501).json({
        message: 'Orders not found'
      })
    }
  }).catch(err => {
    res.status(501).json({
      msg: 'Failed to find the orders',
      err: err
    });
    console.log('Failed to find the orders: ' + JSON.stringify(err, undefined, 2))
  })
})

function getModelFromRequest(reqBody) {
  let billing = new Billing({
    country: reqBody.country,
    state: reqBody.state,
    city: reqBody.city,
    address: reqBody.address,
    zip: reqBody.zip,
    phone: reqBody.phone
  })
  let shipping = new Shipping({
    name: reqBody.shipping,
    sum: {
      type: Number,
      trim: true
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    zip: {
      type: String,
      trim: true
    }
  })
  // todo: mongoose save model including nested models (order, billing, shipping)
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
