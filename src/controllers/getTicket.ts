import { NextFunction, Request, Response } from "express";

import { TicketService } from "../services";

import { logger } from "../utils";
import { HTTP_STATUS_OK, LOGGER_MESSAGE } from "../constants";

const getTicket = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info(LOGGER_MESSAGE.GET_TICKET_REQUEST_RECEIVED);

  try {
    const { id: ticketId } = request.params;
    const ticketNumber = Number(ticketId);
    const ticketService = new TicketService();

    const ticket = ticketService.getTicket(ticketNumber);

    response.status(HTTP_STATUS_OK).json(ticket);
    logger.info(LOGGER_MESSAGE.GET_TICKET_RESPONSE_RETURNED);
  } catch (error) {
    next(error);
  }
};

export default getTicket;
