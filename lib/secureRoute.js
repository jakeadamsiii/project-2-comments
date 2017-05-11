//if not logged in redirect and show a flash message
function secureRoute(req, res, next){
  if(!req.session.isAuthenticated || !req.session.userId){
    return req.session.regnerate(()=>res.unauthorized());
  }

  next();
}

module.exports = secureRoute;
