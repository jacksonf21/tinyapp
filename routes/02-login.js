let express = require('express');
let users = require('../express_server');
let router = express.Router();

router.get('/', (req, res) => {
  let templateVars = {
    username: users[req.cookies.user_id]
  };
  res.render('urls_login', templateVars);
  
});

//CREATE COOKIE
router.post('/', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect(303, '/urls');
});

module.exports = router;