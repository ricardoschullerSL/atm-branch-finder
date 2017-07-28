module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended" ],
    "rules": {
        "indent": [1, 4],
        "quotes": [1, "double"],
        "semi": [1, "always"],
        "react/prop-types": [0],
        "no-console": [0],
        "no-unused-vars": [1],
    },
    "env": {
        "es6": true,
        "node":true,
        "browser":true,
    },
    "globals": {
        "React": true
    },
    "parser": "babel-eslint",
    "parserOptions" : {
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ]    
};