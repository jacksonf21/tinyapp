let express = require('express');
let router = express.Router();

//LOGOUT
router.post('/', (req, res) => {
  res.clearCookie('username');
  res.redirect('/urls');
});

module.exports = router;