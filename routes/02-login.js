let express = require('express');
let router = express.Router();

//CREATE COOKIE
router.post('/', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect(303, '/urls');
});

module.exports = router;