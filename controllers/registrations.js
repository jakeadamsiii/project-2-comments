const User = require('../models/user');

//load resistration page
function newRoute(req, res) {
  return res.render('registrations/new');
}


//Delete account - find current user then remove regenerate session to remove token ans send message
function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('registrations/new', 'Your account has been deleted'));
    })
    .catch(next);

}

//Register than redirect to login 
function createRoute(req, res, next) {

  if(req.file) req.body.image = req.file.key;

  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
