import { NextFunction, Request, Response } from "express";

import { TicketService } from "../services";

import { logger } from "../utils";
import { HTTP_STATUS_OK, LOGGER_MESSAGE } from "../constants";

const getTickets = (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info(LOGGER_MESSAGE.GET_TICKETS_REQUEST_RECEIVED);

  try {
    const ticketService = new TicketService();

    const tickets = ticketService.getTickets();

    response.status(HTTP_STATUS_OK).json(tickets);
    logger.info(LOGGER_MESSAGE.GET_TICKETS_RESPONSE_RETURNED);
  } catch (error) {
    next(error);
  }
};

export default getTickets;
