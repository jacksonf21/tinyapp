const express = require('express');
const users = require('../express_server');
const bcrypt = require('bcrypt');
const { generateRandomString, emailExists } = require('../rand/helper');
const router = express.Router();

//LOGOUT
router.get('/', (req, res) => {
  let templateVars = {
    username: users[req.session.user_id],
    alert: false
  };
  res.render('urls_register', templateVars);
});

router.post('/', (req, res) => {
  let id = generateRandomString(6);
  
  if (!emailExists(req, users) && req.body.password) {
    const pw = req.body.password;
    const hashPw = bcrypt.hashSync(pw, 10);
    
    users[id] = {
      id: id,
      email: req.body.email,
      password: hashPw
    };

    req.session.user_id = id;
    res.redirect(303, '/urls');
  } else {
    res.status(400);
    let templateVars =  {
      username: users[req.session.user_id],
      alert: true
    };

    res.render('urls_register', templateVars);
  }
  
});

module.exports = router;

