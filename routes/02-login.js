let express = require('express');
let users = require('../express_server');
let bcrypt = require('bcrypt');
let router = express.Router();
const { emailExists , keyFromVal } = require('../rand/random');

router.get('/', (req, res) => {
  let templateVars = {
    username: users[req.cookies.user_id]
  };
  res.render('urls_login', templateVars);
});

//CREATE COOKIE
router.post('/', (req, res) => {
  // console.log(req.body.password);
  // console.log(req.cookies);
  // console.log(req.cookies.user_id);

  //NEED TO ADD ID MATCH
  console.log(emailExists(req, users));

  if (emailExists(req, users)) {
    let emailKey = keyFromVal(req, users, 'email');

    if (bcrypt.compareSync(req.body.password, users[emailKey].password)) {
      res.cookie('user_id', emailKey);
      res.redirect(303, '/urls');
    }
  } else {
    res.sendStatus('403');
  }

});

module.exports = router;