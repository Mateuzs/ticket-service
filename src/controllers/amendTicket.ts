import { NextFunction, Request, Response } from "express";

import { TicketService } from "../services";

import { logger } from "../utils";
import { HTTP_STATUS_OK, LOGGER_MESSAGE } from "../constants";

const amendTicket = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.info(LOGGER_MESSAGE.AMEND_TICKET_REQUEST_RECEIVED);

  try {
    const { id: ticketId } = request.params;
    const ticketNumber = Number(ticketId);
    const ticketService = new TicketService();

    ticketService.amendTicket(ticketNumber);

    response.sendStatus(HTTP_STATUS_OK);
    logger.info(LOGGER_MESSAGE.AMEND_TICKET_RESPONSE_RETURNED);
  } catch (error) {
    next(error);
  }
};

export default amendTicket;
