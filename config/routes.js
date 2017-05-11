//everything required up top
const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const skiddle = require('../controllers/SkiddleController');
const oauth = require('../controllers/oauth');
const upload = require('../lib/upload');

//Go to register on load
router.get('/', (req, res) => res.render('registrations/new'));
router.get('/about', (req, res) => res.render('statics/about'));

router.route('/register')
  .get(registrations.new)
  .post(upload.single('image'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/map')
.get(skiddle.eventsIndex);

router.route('/profile')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/profile/edit')
  .get(secureRoute, users.edit);

router.route('/profile/events')
.post(secureRoute, users.createEvent);

router.route('/profile/events/:id')
.delete(secureRoute, users.deleteEvent);

router.route('/oauth/github')
  .get(oauth.github);

router.route('/oauth/facebook')
  .get(oauth.facebook);

router.all('*', (req, res) => res.notFound());

module.exports = router;
