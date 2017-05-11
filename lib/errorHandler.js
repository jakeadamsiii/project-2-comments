const {env} = require('../config/environment');
//turns error into html so it can be shown to the user
//renders an  error page based on statics
function errorHandler(err, req, res, next){
  err.status = err.status || 500;
  err.message = err.messgae || 'Internal server error';

  if(env === 'production') delete err.stack;

  res.status(err.status);
  res.locals.err = err;

  res.render(`statics/${err.status}`);
  next(err);
}

module.exports = errorHandler;
