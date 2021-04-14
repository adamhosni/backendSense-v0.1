const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const deviceRoutes = require('./routes/device');

mongoose.connect('mongodb://localhost/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', userRoutes);
app.use('/api/device',deviceRoutes);

module.exports = app;

