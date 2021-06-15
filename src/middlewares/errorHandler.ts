import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import {
  HTTP_STATUS_CODE_ERROR_CLIENT_BAD_REQUEST,
  HTTP_STATUS_CODE_ERROR_CLIENT_NOT_FOUND,
  HTTP_STATUS_CODE_ERROR_CLIENT_UNAUTHORIZED,
} from "../constants";
import {
  InvalidTicketIdException,
  NoTicketException,
  TicketVerifiedException,
} from "../exceptions";
import { logger } from "../utils";

const errorHandler = (
  error: ErrorRequestHandler,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof NoTicketException) {
    logger.warn(`${error.message}: ${error.ticketId}`);

    response.status(HTTP_STATUS_CODE_ERROR_CLIENT_NOT_FOUND).json({
      code: HTTP_STATUS_CODE_ERROR_CLIENT_NOT_FOUND,
      msg: error.message,
    });
  } else if (error instanceof TicketVerifiedException) {
    logger.warn(`${error.message}: ${error.ticketId}`);

    response.status(HTTP_STATUS_CODE_ERROR_CLIENT_UNAUTHORIZED).json({
      code: HTTP_STATUS_CODE_ERROR_CLIENT_UNAUTHORIZED,
      msg: error.message,
    });
  } else if (error instanceof InvalidTicketIdException) {
    logger.error(`${error.message}: ${error.ticketId}`);

    response.status(HTTP_STATUS_CODE_ERROR_CLIENT_BAD_REQUEST).json({
      code: HTTP_STATUS_CODE_ERROR_CLIENT_BAD_REQUEST,
      msg: error.message,
    });
  } else {
    logger.error(error);
  }
};

export default errorHandler;
