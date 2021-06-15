module.exports = {
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false,
    },
  },
  testMatch: ["**/test/api/**/?(*.)+(spec|test).[jt]s?(x)"],
  reporters: ["default"],
  testEnvironment: "node",
};
