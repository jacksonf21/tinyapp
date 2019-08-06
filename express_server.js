const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

const routesUrls = require('./routes/01-urls');
const routesLogin = require('./routes/02-login');
const routesLogout = require('./routes/03-logout');

app.set('view engine', 'ejs');

//CONVERTS BODY REQ IN BUFFER TO STRING
app.use(bodyParser.urlencoded({extended: true}), cookieParser());

app.use('/urls', routesUrls);
app.use('/login', routesLogin);
app.use('/logout', routesLogout);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
