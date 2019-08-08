const { assert } = require('chai');
const { generateRandomString, emailExists, keyFromVal } = require('../rand/helper');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

const req = {
  body: {email: 'user@example.com'}
};

const req2 = {
  body: {email: 'tuser@example.com'}
};

describe('getUserByEmail', () => {
  it('should return true', () => {
    const user = emailExists(req, testUsers);
    assert.equal(user, true);
  });
  it('should return false', () => {
    const user = emailExists(req2, testUsers);
    assert.equal(user, false);
  });
});

describe('keyFromVal', () => {
  it('should return userRandomID', () => {
    const email = keyFromVal(req, testUsers, 'email');
    assert.equal(email, 'userRandomID');
  });
});

describe('generateRandStr', () => {
  it('should return 6 length', () => {
    assert.equal(generateRandomString(6).length, 6);
  });
});