
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

const validationCheck = (req, users) => {
  let usersKeys = Object.keys(users);
  for (let key of usersKeys) {
    if (users[key].email === req.body.email || users[key].email === '' || users[key].password === '') {
      return false;
    } else {
      return true;
    }
  }
  return true;
};

module.exports = { generateRandomString, validationCheck };