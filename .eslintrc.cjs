module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // disable prop types validation
    "react/prop-types": 0,
  },
  // add override array, without this es lint could only be run
  // via the npm run lint command. adding this will allow it to be run
  // also via the global "npx eslint," command.
  overrides: [
    {
      // without this `npx eslint` doesnt run on jsx files
      files: ["*.js", "*.jsx"],
    },
  ],
};
