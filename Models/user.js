const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const jwtPrivateKey='123456'; // very bad appraoch always use enviroment variable for this
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  lname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50, 
    required: true      
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  hashedAndSaltedPassword: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  // userRole: {
  //   type:String,
  //   enum:['SiteAdmin','Seller','Buyer'],
  //   required: true
  // },
  userRole:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  profileImage:{
    type: String,
    maxlength:1024,
    minlength: 5,
    required: true
  }
});

userSchema.methods.generateAuthToken = function() { 
  // const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  const token = jwt.sign({ _id: this._id, userRole: this.userRole }, jwtPrivateKey);
  return token;
}
const User = mongoose.model('User', userSchema);


function validateUser(user) {
  const schema =Joi.object( {
    fname: Joi.string().min(5).max(50).required(),
    lname: Joi.string().min(5).max(50).required(),
    profileImage: Joi.string().min(5).max(1024).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    userRole: Joi.string().min(5).max(255).required(),
    //userRole:Joi.string.valid('SiteAdmin','Seller','Buyer').required()
  });
  const { error } =schema.validate(user);
  console.log(`Validation status :  ${error}`)
  return error;
}
async function generateHashedPassword(password){
  const salt = await bcrypt.genSalt(10); // to save from rainbow table attack
  password =await bcrypt.hash(password,salt);
  return password;
}

exports.User = User; 
exports.validateUser = validateUser;
exports.generateHashedPassword=generateHashedPassword;

