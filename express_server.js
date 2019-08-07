const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const app = express();
const PORT = 8080;

const routesUrls = require('./routes/01-urls');
const routesLogin = require('./routes/02-login');
const routesLogout = require('./routes/03-logout');
const routesRegister = require('./routes/04-register');

const users = {};

app.set('view engine', 'ejs');

//CONVERTS BODY REQ IN BUFFER TO STRING
app.use(bodyParser.urlencoded({extended: true}), cookieSession({
  name: 'session',
  keys: ['Key1', 'Key2']
}));

app.use('/urls', routesUrls);
app.use('/login', routesLogin);
app.use('/logout', routesLogout);
app.use('/register', routesRegister);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = users;