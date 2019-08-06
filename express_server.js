const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

//CONVERTS BODY REQ IN BUFFER TO STRING
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  'b2xVn2': 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};

//USER GENERATES SHORTURL & REDIRECTS TO
app.post('/urls', (req, res) => {
  // console.log(req.body); Debugging
  // let suffix = req.body.longURL.replace(/[a-z]+./i,'');
  let rdm = generateRandomString(6);
  urlDatabase[rdm] = `http://www.${req.body.longURL}`;
  // console.log(urlDatabase); Debugging
  res.redirect(303, `/urls/${rdm}`);
});

//DELETES URL
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect(303, `/urls`);
});

app.post('/urls/:id', (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect(303, `/urls`);
});

//CREATE COOKIE
app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect(303, '/urls');
});

//HANDLER ALL URLS
app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

//WHEN INPUT PLACED INTO URL
app.get('/urls/:shortURL', (req, res) => {

  if (urlDatabase[req.params.shortURL]) {
    console.log(req.params.shortURL);
    let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
    res.render('urls_show', templateVars);
  } else {
    //EJS FILE
    res.render('404');
  }
});

//SHORTURL ONCLICK REDIRECT TO LONGURL
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(303, longURL);
});

//ROOT
// app.get('/', (req, res) => {
//   res.send('Hello!');
// });

// app.get('/urls.json', (req, res) => {
//   res.json(urlDatabase);
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
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
