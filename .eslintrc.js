// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    "ecmaFeatures": {
      "modules": true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
      "packageDir": "./package.json"
    }],
    "import/default": 2,
    "import/export": 2,
    "import/imports-first": 2,
    "import/no-duplicates": 2,
    "import/named": 2,
    "import/namespace": 2,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "global-require": 1,
    "prefer-template": 0,
    "func-names": ["error", "as-needed"],
    "prefer-arrow-callback": 0,
    "array-callback-return": 0,
    "no-return-assign": ["error", "except-parens"],
    "arrow-body-style": "warn",
    "quotes": [ 2, "double", "avoid-escape" ],
    "object-shorthand": ["error", "never"],
    "indent": ["error", 4],
    "no-tabs": 0,
    "no-use-before-define": ["warn", {"functions": true,  "classes": true, "variables": true }],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
