const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
//When running seeds, first drop the current database
User.collection.drop();

User
  .create([{
    username: 'cooldude',
    firstName: 'Mike',
    lastName: 'Hayden',
    email: 'mike.hayden@ga.co',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Bundesarchiv_Bild_183-S73622%2C_Joachim_Rumohr.jpg',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
