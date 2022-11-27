const express = require('express');

const db = require('./mongoDB.js');

//Middleware
const morgan = require('morgan');
// const cors = require('cors');

var router = require('./routes.js');


var router = require('./routes.js');



//Router
const router = require('./routes.js');

const app = express();
// module.exports.app = app;

app.set('port', 8000);

//Logging and parsing
app.use(morgan('dev'));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => { res.status(200).send('WHY NOT'); });

//Set up routes
app.use('/', router);

// app.use(express.static('client/dist'));

app.listen(app.get('port'), () => {
  console.log(`Server listening on port: ${app.get('port')}`);
});