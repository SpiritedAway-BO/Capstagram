const express = require('express');

// const db = require('./db');

//Middleware
var morgan = require('morgan');
// var cors = require('cors');


//Router
// var router = require('./routes.js');

const app = express();
// module.exports.app = app;

app.set('port', 3000);

//Logging and parsing
app.use(morgan('dev'));
// app.use(cors());
// app.use(express.json());

//Set up routes
// app.use('/api', router);

// app.use(express.static('client/dist'));

app.listen(app.get('port'), () => {
  console.log(`Server listening on port: ${app.get('port')}`);
});