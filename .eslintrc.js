module.exports = {
  "env": {
    "commonjs": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "airbnb-base",
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:jest/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
  }
};
