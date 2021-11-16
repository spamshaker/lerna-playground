module.exports = {
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "none",
  arrowParens: "avoid",
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
        useTabs: false
      }
    }
  ]
};
