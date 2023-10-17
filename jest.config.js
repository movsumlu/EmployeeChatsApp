module.exports = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: [
    "<rootDir>/src/**/*.(test).{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
  ],
};
