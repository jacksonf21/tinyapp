let express = require('express');
let users = require('../express_server');
const bcrypt = require('bcrypt');
const { generateRandomString, emailExists } = require('../rand/helper');
let router = express.Router();

//LOGOUT
router.get('/', (req, res) => {
  let templateVars = {
    username: users[req.session.user_id]
  };
  res.render('urls_register', templateVars);
});

router.post('/', (req, res) => {
  console.log(req.body.email);
  let id = generateRandomString(6);
  
  if (!emailExists(req, users) && req.body.password) {
    const pw = req.body.password;
    const hashPw = bcrypt.hashSync(pw, 10);
    
    console.log(hashPw);

    users[id] = {
      id: id,
      email: req.body.email,
      password: hashPw
    };
    // res.cookie('user_id', id);
    req.session.user_id = id;
    res.redirect(303, '/urls');
    console.log(users);
  } else {
    res.sendStatus(400);
    console.log(users);
  }
  
});

module.exports = router;

