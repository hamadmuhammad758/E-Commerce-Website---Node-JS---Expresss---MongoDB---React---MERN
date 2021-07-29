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
  hashedAndSaltedpassword: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  userRole: {
    type:String,
    enum:['SiteAdmin','Seller','Buyer'],
    required: true
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

exports.createUser=async function(user){
  const isValidUser=validateUser(user);
  if (isValidUser) {
    const user=new User({
      fname:user.fname,
      lname:user.lname,
      email:user.email,
      hashedAndSaltedpassword:generateHashedPassword(user.password),
      userRole:user.userRole,
      profileImage:user.profileImage
    });
    const result=await user.save();
  } else {
      return isValidUser;
  }
  
}

function validateUser(user) {
  const schema = {
    fname: Joi.string().min(5).max(50).required(),
    lname: Joi.string().min(5).max(50).required(),
    profileImage: Joi.string().min(5).max(1024).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    userRole:Joi.string.valid('SiteAdmin','Seller','Buyer').required()
  };
  return Joi.validate(user, schema);
}
async function generateHashedPassword(password){
  const salt = await bcrypt.genSalt(10); // to save from rainbow table attack
  password =await bcrypt.hash(InputJson.password,salt);
  return password;
}

exports.User = User; 
exports.validate = validateUser;

