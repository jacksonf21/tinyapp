const express = require('express');
const router = express.Router();

//SHORTURL ONCLICK REDIRECT TO ACTUAL LONGURL
router.get('/', (req, res) => {
  res.redirect(303, '/urls');
});

module.exports = router;