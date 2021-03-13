const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var helper = require('../helpers/helper');
var Cart = require('../models/cart');

// => localhost:3080/api/users/
router.get('/', helper.verifyToken, (req, res) => {
  User.find().then(users => {
    res.json(users)
  }).catch(err => {
    res.json({
      msg: 'Failed to find users',
      err: err
    });
    console.log('Failed to find users: ' + JSON.stringify(err, undefined, 2));
  })
})

// => localhost:3080/api/users/:id
router.get('/:id', helper.verifyToken, (req, res) => {
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
    let newCart = new Cart({
      userId: user.id
    });
    newCart.save().then(cart => {
      res.status(201).json(user)
    }).catch(err => {
      res.status(501).json({
        msg: `Failed to add a cart to the user ${user.firstName} ${user.lastName}`,
        err: err.message
      })
      console.log('Failed to add a cart to the user: ' + JSON.stringify(err, undefined, 2))
    })
  }).catch((err) => {
    res.status(501).json({
      msg: 'Failed to add the user',
      err: err.message
    })
    console.log('Failed to add the user: ' + JSON.stringify(err, undefined, 2))
  })
});

// => localhost:3080/api/users/password
router.post('/password', helper.verifyToken, (req, res) => {
  User.findOne({
    email: helper.decodedToken.email
  }).then(user => {
    if (user) {
      if (user.isValid(req.params.password)) {
        user.password = req.body.newPassword
        user.save((err, doc) => {
          if (err) return res.status(500).json({
            message: 'Unable to save the new password'
          })
          return res.status(200).json(user);
        })
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

// => localhost:3080/api/users/login
router.post('/login', (req, res) => {
  console.log(req.body);
  User.findOne({
    email: req.body.email
  }).populate('cart').then(user => {
    if (user) {
      if (user.isValid(req.body.password)) {
        // generate token
        let token = jwt.sign({
          email: req.body.email
        }, helper.TOKEN_KEY, {
          expiresIn: '3h'
        })
        user.token = token

        return res.status(200).json(user);
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
    res.status(501).json({
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

router.put('/:id', helper.verifyToken, (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  // let user = getModelFromRequest(req.body);
  User.updateOne({_id: req.params.id}, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role
    }
  }, {
    useFindAndModify: false,
    new: false
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
router.delete('/:id', helper.verifyToken, (req, res, next) => {
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
