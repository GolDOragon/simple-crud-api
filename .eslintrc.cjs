module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: ['import', 'node', 'unicorn'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
  },
  settings: {
    node: {
      allowModules: ['node:http'],
    },
  },
};
