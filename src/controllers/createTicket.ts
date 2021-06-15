import { NextFunction, Request, Response } from "express";

import { TicketService } from "../services";

import { logger } from "../utils";
import { HTTP_STATUS_OK, LOGGER_MESSAGE } from "../constants";

const createTicket = (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info(LOGGER_MESSAGE.CREATE_TICKET_REQUEST_RECEIVED);

  try {
    const ticketService = new TicketService();

    const ticketId = ticketService.createTicket();

    response.status(HTTP_STATUS_OK).json({ id: ticketId });
    logger.info(LOGGER_MESSAGE.CREATE_TICKET_RESPONSE_RETURNED);
  } catch (error) {
    next(error);
  }
};

export default createTicket;
