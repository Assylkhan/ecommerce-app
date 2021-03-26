const express = require('express');
const app = express();
const cors = require('cors');
const port = 3080;
const config = require('./config');
const mongoose = require('mongoose');

const usersController = require('./controllers/usersController');
const itemsController = require('./controllers/itemsController');
const cartController = require('./controllers/cartController');

// Connecting to DB
mongoose.connect(config.mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to db')
}).catch((err) => {
  console.log(JSON.stringify(err, undefined, 2))
})
// var corsOptions = {
//   origin: "http://localhost:4200"
// };

// allow the local origin only
// app.use(cors(corsOptions));

// allow all origins
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// add data from <form> to the body property of request
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(process.cwd() + "/../dist/ecommerce-app/"));

app.use('/api/users', usersController);
app.use('/api/items', itemsController);
app.use('/api/cart', cartController);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/../dist/ecommerce-app/index.html")
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
