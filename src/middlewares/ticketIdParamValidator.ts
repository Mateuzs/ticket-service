import { NextFunction, Request, Response } from "express";

import { InvalidTicketIdException } from "../exceptions";
import { ERROR_MESSAGE } from "../constants";
import { validateTicketId } from "../utils";

const ticketIdParamValidator = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const { id: ticketId } = request.params;
  const isValidTicketId = validateTicketId(ticketId);

  if (!isValidTicketId) {
    next(new InvalidTicketIdException(ERROR_MESSAGE.INVALID_ID, ticketId));
  }

  next();
};

export default ticketIdParamValidator;
