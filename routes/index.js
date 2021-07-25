var express = require('express')
  , router = express.Router();
  
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome");
  // res.render('index', { title: 'Express' });
});


// List of all routers
router.use('/users', require('./users'))


module.exports = router