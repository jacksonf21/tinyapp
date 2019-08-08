const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const PORT = 8080;

const routesUrls = require('./routes/01-urls');
const routesLogin = require('./routes/02-login');
const routesLogout = require('./routes/03-logout');
const routesRegister = require('./routes/04-register');
const routesU = require('./routes/05-u');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}), cookieSession({
  name: 'session',
  keys: ['Key1lighthouselabsistheBest', 'Key2bootcampstrongestToronto']
}));

app.use(express.static('public'));

app.use('/u', routesU);
app.use('/urls', routesUrls);
app.use('/login', routesLogin);
app.use('/logout', routesLogout);
app.use('/register', routesRegister);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
