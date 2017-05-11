//take from Zhrc file, if not use port 3000 - for Heroku deployment also has session secret 
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV ||'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/PROJECT_NAME-${env}`;
const sessionSecret = process.env.SESSION_SECRET || 'Keep it secret, keep it safe';

module.exports = { port, env, dbURI, sessionSecret };
