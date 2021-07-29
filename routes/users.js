// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

var express = require('express');
var router = express.Router();
const {createUser,getUsersById,getUsers,deleteUsers,updateUsers}= require('../Controllers/users');

router
      .route('/')
      .get(getUsers)
      .post(createUser);
      

router
      .route('/:id')
      .get(getUsersById)
      .delete(deleteUsers)
      .put(updateUsers);

module.exports = router;


