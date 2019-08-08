let express = require('express');
let users = require('../express_server');
let bcrypt = require('bcrypt');
let router = express.Router();
const { emailExists , keyFromVal } = require('../rand/helper');

router.get('/', (req, res) => {
  let templateVars = {
    username: users[req.session.user_id],
    alert: false
  };
  res.render('urls_login', templateVars);
});

//CREATE COOKIE
router.post('/', (req, res) => {

  //NEED TO ADD ID MATCH
  if (emailExists(req, users)) {
    let emailKey = keyFromVal(req, users, 'email');

    if (bcrypt.compareSync(req.body.password, users[emailKey].password)) {
      req.session.user_id = emailKey;
      res.redirect(303, '/urls');
    }
  } else {
    res.status(403);
    let templateVars =  {
      username: users[req.session.user_id],
      alert: true
    };

    res.render('urls_login', templateVars);
  }

});

module.exports = router;