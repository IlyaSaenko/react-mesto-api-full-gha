module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
      "no-underscore-dangle": ["error", { "allow": ["_id"] }],
      "eol-last": 0,
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "linebreak-style": 0,
      "quotes": ["error", "double"],
      "error": {
        "ObjectExpression": { "consistent": true, "multiline": true },
        "ObjectPattern": { "consistent": true, "multiline": true },
        "ImportDeclaration": "never",
        "ExportDeclaration": { "multiline": true, "minProperties": 3 }
      }
    }
  }