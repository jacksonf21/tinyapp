let express = require('express');
let router = express.Router();
const { generateRandomString } = require('../rand/random');
const users = require('../express_server')

const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

//SHOW ALL URLS
router.get('/', (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: users[req.cookies.user_id]

  };
  res.render('urls_index', templateVars);
});

//CREATE NEW URL
router.get('/new', (req, res) => {
  if (req.cookies.user_id) {
    let templateVars = {
      username: users[req.cookies.user_id]
  
    };
    res.render('urls_new', templateVars);
  } else {
    res.redirect(303, '/login');
  }
});

//CREATE NEW URL => GENERATES SHORTURL & REDIRECTS TO SHOW ALL URLS
router.post('/', (req, res) => {
  let suffix = req.body.longURL.replace(/.+w\./i, '');
  let rdm = generateRandomString(6);
  urlDatabase[rdm] = `http://www.${suffix}`;
  res.redirect(303, `/urls/${rdm}`);
});

//DELETES URL
router.post('/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(303, `/urls`);
});

//EDIT URL
router.post('/:id', (req, res) => {
  let suffix = req.body.longURL.replace(/.+w\./i, '');
  urlDatabase[req.params.id] = `http://www.${suffix}`;
  res.redirect(303, `/urls`);
});

//EACH INSTANCE OF SHORTURL PAGE
router.get('/:shortURL', (req, res) => {

  if (urlDatabase[req.params.shortURL]) {
    let templateVars = {
      shortURL: req.params.shortURL,
      //NEEDS TO BE UPDATED BELOW TO INCLUDE .longURL
      longURL: urlDatabase[req.params.shortURL],
      username: users[req.cookies.user_id]
    };

    res.render('urls_show', templateVars);
  } else {
    //EJS FILE
    res.render('404');
  }
});

//SHORTURL ONCLICK REDIRECT TO ACTUAL LONGURL
router.get('/u/:shortURL', (req, res) => {
  //NEEDS TO BE UPDATED BELOW TO INCLUDE .longURL
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(303, longURL);
});


module.exports = router;