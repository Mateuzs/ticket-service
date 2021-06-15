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
  testMatch: ["**/test/unit/**/?(*.)+(spec|test).[jt]s?(x)"],
  reporters: ["default"],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 70,
      functions: 80,
      lines: 90,
    },
  },
};
