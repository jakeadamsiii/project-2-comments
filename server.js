// require our packages
const express = require('express');
const User = require('./models/user');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { port, env, dbURI, sessionSecret } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const routes = require('./config/routes');
const customResonses = require('./lib/customResponses');
const authentication = require('./lib/authentication');

//create an express app
const app = express();


//set up our template engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

//set up static files folder
//look in public folder
app.use(express.static(`${__dirname}/public`));

//connect to database
mongoose.connect(dbURI);

//set up middleware
if (env !== 'test') app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride((req) => {
  if(req.body  && typeof req.body ==='object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//set up sessions
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));

//set up flash methods AFTER sessions
app.use(flash());

app.use((req, res, next) => {
  if(!req.session.isAuthenticated) return next();

  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in');
          res.redirect('/login');
        });
      }

      req.session.userId = user.id;

      res.locals.user = user;
      res.locals.isAuthenticated = true;

      next();
    });
});


app.use(customResonses);
app.use(authentication);

//set up routes - just before error handler
app.use(routes);

//set up error handler - always the last piece of middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening to port ${port}`));
