const express = require('express');
var router = express.Router();
var Item = require('../models/item');
const usersController = require('./usersController');
var helper = require('../helpers/helper');

// => localhost:3080/api/items/
router.get('/', helper.verifyToken, (req, res) => {
  Item.find().then(items => {
    res.json(items);
  }).catch(err => {
    res.json({
      msg: 'Failed to find items',
      err: err
    });
    console.log('Failed to find items: ' + JSON.stringify(err, undefined, 2));
  })
})

// => localhost:3080/api/items/:id
router.get('/:id', helper.verifyToken, (req, res) => {
  Item.findById(req.params.id).then(item => {
    res.json(item)
  }).catch(err => {
    res.json({
      msg: 'Failed to find the item',
      err: err
    });
    console.log('Failed to find the item: ' + JSON.stringify(err, undefined, 2))
  })
});

// => localhost:3080/api/items/
router.post('/', helper.verifyToken, (req, res) => {
  let newItem = getModelFromRequest(req.body);
  newItem.save().then((item) => {
    res.status(201).json(item)
  }).catch((err) => {
    console.log('Failed to add the item: ' + JSON.stringify(err, undefined, 2))
    res.status(501).json({
      msg: 'Failed to add the item',
      err: err.message
    })
  })
});

function getModelFromRequest(reqBody) {
  let item = new Item({
    name: reqBody.name,
    realPrice: reqBody.realPrice,
    price: reqBody.price,
    description: reqBody.description,
    count: reqBody.count,
    imageUrl: reqBody.imageUrl,
    imageFileName: reqBody.imageFileName
  });
  return item;
}

module.exports = router;
