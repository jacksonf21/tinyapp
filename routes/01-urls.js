let express = require('express');
let router = express.Router();
const { generateRandomString } = require('../rand/helper');
const users = require('../express_server');

const urlDatabase = {
  'b2xVn2': { longURL: 'http://www.lighthouselabs.ca', userID: 'none'},
  '9sm5xK': { longURL: 'http://www.google.com', userID: 'none'}
};

//SHOW ALL URLS
router.get('/', (req, res) => {
  const urlDatabaseFiltered = {};
  const urlKeys = Object.keys(urlDatabase);
  for (let url of urlKeys) {
    if (urlDatabase[url].userID === req.session.user_id) {
      urlDatabaseFiltered[url] = urlDatabase[url];
    }
  }
  console.log(urlDatabaseFiltered);

  let templateVars = {
    urls: urlDatabaseFiltered,
    username: users[req.session.user_id]

  };
  res.render('urls_index', templateVars);
});

//CREATE NEW URL
router.get('/new', (req, res) => {
  if (req.session.user_id) {
    let templateVars = {
      username: users[req.session.user_id]
  
    };
    res.render('urls_new', templateVars);
  } else {
    res.redirect(303, '/login');
  }
});

//CREATE NEW URL => GENERATES SHORTURL & REDIRECTS TO SHOW ALL URLS
router.post('/', (req, res) => {
  let suffix = req.body.longURL.replace(/.+w\./i, '');
  let web = `http://www.${suffix}`;
  let rdm = generateRandomString(6);
  urlDatabase[rdm] = {
    longURL: web,
    userID: req.session.user_id
  };
  console.log(urlDatabase);

  res.redirect(303, `/urls/${rdm}`);
});

//DELETES URL
router.post('/:shortURL/delete', (req, res) => {

  if (req.session.user_id && urlDatabase[req.params.shortURL].userID === req.session.user_id) {
    delete urlDatabase[req.params.shortURL];
    res.redirect(303, `/urls`);
  } else {
    res.send('cannot delete, as this is not your link');
  }
});

//EDIT URL
router.post('/:id', (req, res) => {
  //NOT THE SAME ID LOGIC
  if (req.session.user_id && urlDatabase[req.params.id].userID !== req.session.user_id) {
    res.send('cannot edit, as this is not your link');
  } else if (urlDatabase[req.params.id].userID === req.session.user_id) {
    let suffix = req.body.longURL.replace(/.+w\./i, '');
    urlDatabase[req.params.id].longURL = `http://www.${suffix}`;
    res.redirect(303, `/urls`);
  } else {
    res.send('please login');
  }
  //LOGIN LOGIC


});

//EACH INSTANCE OF SHORTURL PAGE
router.get('/:shortURL', (req, res) => {

  if (urlDatabase[req.params.shortURL]) {
    let templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[req.params.shortURL].longURL,
      username: users[req.session.user_id]
    };

    res.render('urls_show', templateVars);
  } else {
    //EJS FILE
    res.render('404');
  }
});

//SHORTURL ONCLICK REDIRECT TO ACTUAL LONGURL
router.get('/u/:shortURL', (req, res) => {
  // console.log(req.params.shortURL);
  //NEEDS TO BE UPDATED BELOW TO INCLUDE .longURL
  let longURL = urlDatabase[req.params.shortURL].longURL;
  // console.log(longURL);
  res.redirect(303, longURL);
});


module.exports = router;