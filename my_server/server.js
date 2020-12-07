const express = require('express');
const app = express(),
  bodyParser = require("body-parser");
const cors = require('cors');
const port = 3080;
const mongoose = require('mongoose');
const route = require('./routes/route');
const config = require('./config');

mongoose.connect(config.mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
});

mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Error in Database connection: ' + err);
  }
});

// var corsOptions = {
//   origin: "http://localhost:4200"
// };

// allow the local origin only
// app.use(cors(corsOptions));

// allow all origins
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// add data from <form> to the body property of request
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(process.cwd() + "/../dist/ecommerce-app/"));

app.use('/api', route);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/../dist/ecommerce-app/index.html")
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
