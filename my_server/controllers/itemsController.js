const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var Item = require('../models/item');
var jwt = require('jsonwebtoken');
const TOKEN_KEY = 'secretKeyNeedsStrongerOne';
const usersController = require('./controllers/usersController');

// => localhost:3080/api/items/
router.get('/', usersController.verifyToken, (req, res) => {
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
