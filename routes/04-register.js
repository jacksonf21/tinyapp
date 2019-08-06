let express = require('express');
let router = express.Router();

//LOGOUT
router.get('/', (req, res) => {
  let templateVars = {
    username: req.cookies.username
  };
  res.render('urls_register', templateVars);
});

module.exports = router;