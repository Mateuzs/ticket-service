import express, { Application } from "express";
import helmet from "helmet";

import { default as router } from "./routes";
import { errorHandler } from "./middlewares";
import { ENV_PORT } from "./constants";

const app: Application = express();
app.set(ENV_PORT, process.env.PORT || 3000);

app.use(helmet());
app.use(router);
app.use(errorHandler);

export default app;
