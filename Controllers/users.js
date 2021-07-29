const {User, validate} = require('../models/user');

exports.getUsers=async (req,res,next) =>{
    res.send("Getting List of Users");
};
exports.getUsersById=async (req,res,next) =>{
    res.send("Getting List of User by ID");
};
exports.createUser=async(req,res,next)=>{
    const user=_.pick[req.body,['fname'],['lname'],['email'],['profileImage'],['userRole']]
};
exports.deleteUsers=async(req,res,next)=>{
};
exports.updateUsers=async(req,res,next)=>{
};
