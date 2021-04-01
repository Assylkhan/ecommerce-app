const express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Position = require('../models/position');
var helper = require('../helpers/helper');
var ObjectId = require('mongoose').Types.ObjectId;

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

  // todo: if there's a position with the same item, update the position instead of creating a new position

  var newData = {
    cartId: req.params.id,
    itemId: req.body.itemId,
    quantity: req.body.quantity,
    sum: req.body.sum
  };

  Position.findOneAndUpdate({'cartId': req.params.id, 'itemId': req.body.itemId}, newData, {upsert: true, useFindAndModify: false, 'new': true}, function(err, position) {
    if (err) {
      res.status(501).json({
        msg: 'Failed to add the position',
        err: err.message
      })
    } else {
      Cart.findOne({
        _id: req.params.id
      }).populate('positions').then(cart => {
        let positionIndex = cart.positions.findIndex(pos => pos.itemId == req.body.itemId)
        if (cart.positions.length < 1 || positionIndex < 0) {
          cart.positions.push(position)
        } else {
          if (positionIndex > -1) {
            cart.positions[positionIndex] = position
          }
        }
        console.log('unsaved cart')
        console.log(cart)
        cart.save().then(savedCart => {
          console.log('savedCart')
          console.log(savedCart)
          res.status(201).json(savedCart)
        }).catch(err => {
          res.status(501).json({
            msg: 'Failed to save the cart',
            err: err
          });
          console.log('Failed to save the cart: ' + JSON.stringify(err, undefined, 2));
        })
      }).catch(err => {
        res.status(501).json({
          msg: 'Failed to find the cart',
          err: err
        });
        console.log('Failed to find the cart: ' + JSON.stringify(err, undefined, 2));
      })
    }
  })

});

// => localhost:3080/api/cart/:id
router.put('/:id', helper.verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  Cart.updateOne({
    _id: req.params.id
  }, {
    $set: {
      userId: req.body.userId,
      sum: req.body.sum
    }
  }, {
    useFindAndModify: false,
    new: false
  }).then(cart => {
    res.status(200).json(cart);
  }).catch(err => {
    res.status(501).json({
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
      res.status(200).json(cart);
    } else {
      return res.status(501).json({
        message: 'Cart not found'
      })
    }
  }).catch(err => {
    res.status(501).json({
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
