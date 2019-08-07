let express = require('express');
let router = express.Router();

//LOGOUT
router.post('/', (req, res) => {
  // res.clearCookie('user_id');
  req.session = null;
  res.redirect('/urls');
});

module.exports = router;