const express = require('express');
var router = express.Router();
var Item = require('../models/item');
var helper = require('../helpers/helper');
const config = require('../config');
var ObjectId = require('mongoose').Types.ObjectId;
const Dropbox = require("dropbox").Dropbox;
fs = require('fs')

const fetch = require("isomorphic-fetch");

const dbx = new Dropbox({
  accessToken: config.dropboxAccessToken,
  // fetch: fetch
});

// dbx.usersGetCurrentAccount()
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

dbx.filesListFolder({
    path: ''
  })
  .then(function (response) {
    console.log(response.result.entries);
  })
  .catch(function (error) {
    console.error(error);
  });

router.post("/dbx", (req, res) => {

  let imageArray;

  //Receive either a single image or an array of images from the front end and
  //its placed in req.files by express-fileupload

  if (req.files.itemImage.length) {
    imageArray = [...req.files.itemImage];
  } else {
    imageArray = [req.files.itemImage];
  }

  imageArray.forEach(image => {
    console.log("Image==>>", image)

    dbx
      .filesUpload({
        path: `/${image.name}`,
        contents: image.data
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

// => localhost:3080/api/items/
router.get('/', helper.verifyToken, (req, res) => {
  console.log('req.params.featured: ' + req.params.featured)
  if (req.params.featured != null) {
    Item.find({featured: true}).then(items => {
      console.log(items)
      res.json(items);
    }).catch(err => {
      res.json({
        msg: 'Failed to find items',
        err: err
      });
      console.log('Failed to find items: ' + JSON.stringify(err, undefined, 2));
    })
  } else {
    Item.find().then(items => {
      console.log(items)
      res.json(items);
    }).catch(err => {
      res.json({
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
    saveImages(req.body.images)
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
  let item = getModelFromRequest(req.body);
  Item.findByIdAndUpdate(req.params.id, {
    $set: item
  }, {
    new: true
  }).then(item => {
    res.json(item);
  }).catch(err => {
    res.json({
      msg: 'Failed to update the item',
      err: err
    });
    console.log('Failed to update the item: ' + JSON.stringify(err, undefined, 2));
  })
});

function saveImages(images) {
  console.log('images')
  console.log(images)
  if (images.itemImage.length) {
    imageArray = [...images.itemImage];
  } else {
    imageArray = [images.itemImage];
  }

  imageArray.forEach(image => {
    console.log("Image==>>", image)
    dbx.filesUploadSessionStart({
        contents: image,
        close: true
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    // dbx
    //   .filesUpload({
    //     path: `/${image.name}`,
    //     contents: image.data
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  });
  dbx.filesUploadSessionFinishBatch({
    entries: {
      cursor: {
        session_id: file1Start.session_id,
        offset: testFile1Data.length
      },
      commit: {
        path: "/testFile1.txt"
      }
    }
  })
}

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
