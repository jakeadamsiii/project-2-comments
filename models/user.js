const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const s3 = require('aws-sdk/clients/s3');

//Event schema - for users to save events to their profile.
const eventSchema = new mongoose.Schema({
  eventName: {type: String},
  price: {type: String},
  venue: {type: String},
  link: {type: String},
  date: {type: String},
  time: {type: String}
});

//User schema w/ events schema referenced
const userSchema = new mongoose.Schema({
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  password: { type: String },
  githubId: { type: Number },
  facebookId: {type: String},
  events: [eventSchema]
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {

    //let profImage = this.image;
    if(!this.image){
      console.log('working');
      this.image = 'profile-pic.png';
    }
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/wdildnproject2/${this.image}`;
  });

// lifecycle hook - mongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});
//Hashes password for security 
userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// userSchema.pre('remove', function removeImage(next) {
//   s3.deleteObject({ Key: this.image }, next);
// });


userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
