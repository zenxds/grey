module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6
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
    "no-unused-vars": "off",
    "no-console": "off",
    // 行尾必须加分号
    "semi": "off",
    // 文件末尾必须留空行
    "eol-last": "off",
    // IE8在数组或对象的末尾元素后加逗号会抛出错误
    "comma-dangle": "off"
  }
};