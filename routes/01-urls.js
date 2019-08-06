let express = require('express');
let router = express.Router();

const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

//SHOW ALL URLS
router.get('/', (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
  res.render('urls_index', templateVars);
});

//CREATE NEW URL
router.get('/new', (req, res) => {
  let templateVars = {
    username: req.cookies.username
  };
  res.render('urls_new', templateVars);
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
      longURL: urlDatabase[req.params.shortURL],
      username: req.cookies.username
    };

    res.render('urls_show', templateVars);
  } else {
    //EJS FILE
    res.render('404');
  }
});

//SHORTURL ONCLICK REDIRECT TO ACTUAL LONGURL
router.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(303, longURL);
});

const generateRandomString = (n) => {
  let cipher = '';
  for (let i = 0; i < n; i++) {
    if (random(100) % 2 === 0) {
      cipher += random(9, 1);
    } else {
      if (random(100) % 2 === 0) {
        cipher += String.fromCharCode(random(26, 65));
      } else {
        cipher += String.fromCharCode(random(26, 97));
      }
    }
  }
  return cipher;
};

const random = (range, floor = 0) => {
  return Math.floor((Math.random() * range) + floor);
};

module.exports = router;