// external
import pino, { Logger } from "pino";
// types
import { Environment, LoggerLevel } from "../types";

let logger: Logger;

if (process.env.ENV === Environment.LOCAL) {
  logger = pino({
    prettyPrint: {
      colorize: true,
      ignore: "hostname,pid",
      translateTime: "HH:MM:ss.l",
    },
    level: LoggerLevel.INFO,
  });
} else {
  logger = pino({
    level: LoggerLevel.INFO,
  });
}

export default logger;
