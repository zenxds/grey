module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2017
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "import"
  ],
  "rules": {
    "no-unused-vars": 0,
    "no-console": 0,
    "no-empty": 0,
    "semi": 0,
    "eol-last": 0,
    "comma-dangle": 0
  }
};