let express = require('express');
let users = require('../express_server');
const { generateRandomString } = require('../rand/random');
const { validationCheck } = require('../rand/random');
let router = express.Router();

//LOGOUT
router.get('/', (req, res) => {
  let templateVars = {
    username: req.cookies.username
  };
  res.render('urls_register', templateVars);
});

router.post('/', (req, res) => {
  console.log(req.body.email);
  let id = generateRandomString(6);
  users[id] = id;
  users[id] = {id};
  res.cookie(`userId${id}`, id);
  
  if (validationCheck(req, users) === true) {
    users[id].email = req.body.email;
    users[id].password = req.body.password;
  }
  
  console.log(users);
  res.redirect(303, '/urls');
});

module.exports = router;

