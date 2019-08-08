const express = require('express');
const router = express.Router();

//LOGOUT
router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/urls');
});

module.exports = router;