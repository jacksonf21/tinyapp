const express = require('express');
const router = express.Router();
const { urlDatabase } = require('../db/database');

//SHORTURL ONCLICK REDIRECT TO ACTUAL LONGURL
router.get('/:shortURL', (req, res) => {
  let today = String(new Date());
  let date = today.replace(/GMT.+/gi, '');
  
  urlDatabase[req.params.shortURL].counter += 1;
  urlDatabase[req.params.shortURL].dateOnClick.push(date);
  let longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(303, longURL);
});

module.exports = router;