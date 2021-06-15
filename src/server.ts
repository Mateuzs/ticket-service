import app from "./app";

import { LOGGER_MESSAGE, ENV_PORT } from "./constants";
import { logger } from "./utils";

const server = app.listen(app.get(ENV_PORT), () => {
  logger.info(`${LOGGER_MESSAGE.RUNNING} ${app.get(ENV_PORT)}`);
});

export default server;
