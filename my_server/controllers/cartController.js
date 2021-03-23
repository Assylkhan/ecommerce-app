const express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var helper = require('../helpers/helper');

// => localhost:3080/api/cart
router.post('/', (req, res) => {
  let newCart = getModelFromRequest(req.body);
  newCart.save().then((cart) => {
    res.status(201).json(cart)
  }).catch((err) => {
    res.status(501).json({
      msg: 'Failed to add the cart',
      err: err.message
    })
    console.log('Failed to add the cart: ' + JSON.stringify(err, undefined, 2))
  })
});

router.put('/fillUserCart/:id', helper.verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  let newPosition = new Position({
    userId: reqBody.userId,
    sum: reqBody.sum
  });

  Cart.updateOne({_id: req.params.id}, {
    $set: {
      userId: req.body.userId,
      sum: req.body.sum
    }
  }, {
    useFindAndModify: false,
    new: false
  }).then(cart => {
    res.json(cart);
  }).catch(err => {
    res.json({
      msg: 'Failed to update the cart',
      err: err
    });
    console.log('Failed to update the cart: ' + JSON.stringify(err, undefined, 2));
  })
});

// => localhost:3080/api/cart/:id
router.put('/:id', helper.verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  let cart = getModelFromRequest(req.body);
  Cart.updateOne({_id: req.params.id}, {
    $set: {
      userId: req.body.userId,
      sum: req.body.sum
    }
  }, {
    useFindAndModify: false,
    new: false
  }).then(cart => {
    res.json(cart);
  }).catch(err => {
    res.json({
      msg: 'Failed to update the cart',
      err: err
    });
    console.log('Failed to update the cart: ' + JSON.stringify(err, undefined, 2));
  })
});

// => localhost:3080/api/cart/:id
router.get('cart/:id', helper.verifyToken, (req, res) => {
  Cart.find({
    userId: req.params.id
  }).then(cart => {
    if (cart) {
      res.json(cart);
    } else {
      return res.status(501).json({
        message: 'Cart not found'
      })
    }
  }).catch(err => {
    res.json({
      msg: 'Failed to find the cart',
      err: err
    });
    console.log('Failed to find the cart: ' + JSON.stringify(err, undefined, 2))
  })
})

function getModelFromRequest(reqBody) {
  let cart = new Cart({
    userId: reqBody.userId,
    sum: reqBody.sum
  });
  return cart;
}

module.exports = router;
