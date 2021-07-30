const _=require('lodash');
const {User, validateUser, generateHashedPassword} = require('../models/user');

exports.getUsers=async (req,res,next) =>{
    const user=await User.find({});
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(204).send("No Record Exist"); //No Content
    }    
};

exports.getUsersById=async (req,res,next) =>{
    console.log('get users by id');
    // res.send("Getting List of User by ID");
    const user=await User.find({_id:req.params.id});
    if (user.length>0) {
        res.status(200).json(user);
    } else {
        res.status(404).send("No Record Exist"); //No Content
    }   
};
exports.createUser=async(req,res,next)=>{
    // Supply the following JSON on below URL
    // localhost:5000/api/v1/users/
    // {
    //     "fname":"Muhammadd",
    //     "lname":"Hamad",
    //     "password":"12345",
    //     "email":"mhama@gmail.com",
    //     "profileImage":"/aa/ss/dd",
    //     "userRole":"Admin"
    // }

    console.log('creating new user');
    const user=_.pick(req.body,['fname'],['password'],['lname'],['email'],['profileImage'],['userRole'])
    const isValidUser=validateUser(user);

    if (!isValidUser) {
        console.log('valid user in create user'+user);
        user.hashedAndSaltedPassword=await generateHashedPassword(user.password);
        delete user.password;
        try {          
            const newUser=new User(user);
            const result=await newUser.save();
            res.status(200).send(result);

        } catch (error) {
            //console.log(error.message);
            res.status(400).send(error.message); // Bad Request
        }
       
    } else {
        console.log('invalid user in create user');
        res.status(400).send(`${isValidUser.message}`);
    }         
};
exports.deleteUsers=async(req,res,next)=>{
};
exports.updateUsers=async(req,res,next)=>{
};
