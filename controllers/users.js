const User = require('../models/user');

function showRoute(req, res) {
  res.render('users/show');
}

function editRoute(req, res) {
  res.render('users/edit');
}

//Find current user, get event information and push to the users events.
//redirect to profile
function createEventRoute(req, res, next){
  User.findById(req.user.id)
  .exec()
  .then((user)=>{
    user.events.push(req.body);
    user.save();
  })
  .then(() => res.redirect('/profile'))
  .catch(next);
}

//Edit
function updateRoute(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  return req.user.save()
    .then(() => res.redirect('/profile'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/profile', err.toString());
      next(err);
    });
}

//Delete user
function deleteRoute(req, res, next) {
  req.user.remove()
    .then(() => res.redirect('/users'))
    .catch(next);
}

//Delete an event from your page 
function deleteEventRoute(req, res, next) {
  const event = req.user.events.id(req.params.id);

  if(!event) return res.notFound();

  event.remove();

  req.user.save()
    .then(() => res.redirect('/profile'))
    .catch(next);

}

module.exports = {
  show: showRoute,
  //newImage: newImageRoute,
  //createImage: createImageRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createEvent: createEventRoute,
  deleteEvent: deleteEventRoute
};
