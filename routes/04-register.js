let express = require('express');
let users = require('../express_server');
const { generateRandomString } = require('../rand/random');
const { validationCheck } = require('../rand/random');
let router = express.Router();

//LOGOUT
router.get('/', (req, res) => {
  let templateVars = {
    username: users[req.cookies.user_id]
  };
  res.render('urls_register', templateVars);
});

router.post('/', (req, res) => {
  console.log(req.body.email);
  let id = generateRandomString(6);
  
  if (validationCheck(req, users) === true) {
    users[id] = id;
    users[id] = {id};
    users[id].email = req.body.email;
    users[id].password = req.body.password;
    
    res.cookie('user_id', id);
    res.redirect(303, '/urls');
    console.log(users);
  } else {
    res.send('fail');
    console.log(users);
  }
  
});

module.exports = router;

