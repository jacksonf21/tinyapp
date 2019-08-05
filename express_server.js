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

app.post('/urls', (req, res) => {
  console.log(req.body);
  urlDatabase[generateRandomString()] = req.body.longURL;
  console.log(urlDatabase);
  res.send('Ok');
});

//HANDLER
app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render('urls_show', templateVars);
});

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//A = 65
//Z = 90

//a = 97
//z = 122

const generateRandomString = () => {
  let cipher = '';
  for (let i = 0; i < 6; i++) {
    if (Math.random() > 0.5) {
      cipher += Math.floor(Math.random() * 9 + 1);
      
    } else {
      if (Math.random() > 0.5) {
        cipher += String.fromCharCode(Math.floor((Math.random() * 26) + 65));
      } else {
        cipher += String.fromCharCode(Math.floor((Math.random() * 26) + 97));
      }
    }
  }
  
  return cipher;
};

// console.log(generateRandomString());