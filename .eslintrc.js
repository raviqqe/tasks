const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: path.join(__dirname, "tsconfig.json"),
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import", "jest", "prettier", "react"],
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "arrow-body-style": "error",
    "import/no-cycle": "error",
    "import/no-default-export": "error",
    "import/no-unused-modules": "error",
    "import/order": "error",
    "no-else-return": "error",
    "no-return-await": "error",
    "no-unused-vars": "off",
    "no-useless-return": "error",
    "sort-keys": "error"
  },
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
