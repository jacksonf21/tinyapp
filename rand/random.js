
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
  cipher = String(cipher);
  return cipher;
};

const random = (range, floor = 0) => {
  return Math.floor((Math.random() * range) + floor);
};

//CHECK IF EMAIL EXISTING AND PASSWORD MATCHES
const emailExists = (req, users) => {
  let usersKeys = Object.keys(users);
  for (let key of usersKeys) {
    if (users[key].email === req.body.email) return true;
  }
  return false;
};

const keyFromVal = (req, users) => {
  let emailKey = Object.keys(users).find(key => users[key].email === req.body.email);
  return emailKey;
};

module.exports = { generateRandomString, emailExists, keyFromVal };