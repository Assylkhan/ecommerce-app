const express = require('express');
var router = express.Router();
var Item = require('../models/item');
var helper = require('../helpers/helper');
const config = require('../config');
var ObjectId = require('mongoose').Types.ObjectId;

fs = require('fs')

// => localhost:3080/api/items/
router.get('/', helper.verifyToken, (req, res) => {
  console.log('req.params.featured: ' + req.params.featured)
  if (req.params.featured != null) {
    Item.find({featured: true}).then(items => {
      console.log(items)
      res.status(201).json(items);
    }).catch(err => {
      res.status(501).json({
        msg: 'Failed to find items',
        err: err
      });
      console.log('Failed to find items: ' + JSON.stringify(err, undefined, 2));
    })
  } else {
    Item.find().then(items => {
      console.log(items)
      res.status(201).json(items);
    }).catch(err => {
      res.status(501).json({
        msg: 'Failed to find items',
        err: err
      });
      console.log('Failed to find items: ' + JSON.stringify(err, undefined, 2));
    })
  }
})

// => localhost:3080/api/items/:id
router.get('/:id', helper.verifyToken, (req, res) => {
  console.log('req.params.id')
  console.log(req.params)
  Item.findById(req.params.id).then(item => {
    res.status(201).json(item)
  }).catch(err => {
    console.log('Failed to find the item: ' + JSON.stringify(err, undefined, 2))
    res.status(501).json({
      msg: 'Failed to find the item',
      err: err
    });
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

// => localhost:3080/api/items/:id
router.put('/:id', helper.verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Item.updateOne({_id: req.params.id}, {
    $set: {
      name: req.body.name,
      realPrice: req.body.realPrice,
      price: req.body.price,
      description: req.body.description,
      count: req.body.count,
      featured: req.body.featured,
      imageUrls: req.body.imageUrls,
    }
  }, {
    useFindAndModify: false,
    new: false
  }).then(item => {
    res.status(201).json(item);
  }).catch(err => {
    res.status(501).json({
      msg: 'Failed to update the item',
      err: err
    });
    console.log('Failed to update the item: ' + JSON.stringify(err, undefined, 2));
  })
});

// => localhost:3080/api/items/:id
router.delete('/:id', helper.verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  Item.findByIdAndDelete(req.params.id).then(resp => {
    console.log('resp')
    console.log(resp)
    resp.status(201)
  }).catch(err => {
    res.status(501).json({
      msg: 'Failed to delete the item',
      err: err
    });
    console.log('Failed to delete the item: ' + JSON.stringify(err, undefined, 2));
  })
});

function getModelFromRequest(reqBody) {
  let item = new Item({
    name: reqBody.name,
    realPrice: reqBody.realPrice,
    price: reqBody.price,
    description: reqBody.description,
    count: reqBody.count,
    featured: reqBody.featured,
    imageUrls: reqBody.imageUrls,
  });
  return item;
}

module.exports = router;
