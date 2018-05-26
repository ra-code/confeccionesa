const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const crudRoutes = require('./routes/crud');
const clients = require('./routes/clients');



app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/admin', crudRoutes);
app.use('/clients', clients);



app.listen(app.get('port'), () => {
  console.log('server on port 3000');
});