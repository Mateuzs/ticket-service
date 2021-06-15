import { SimpleDbAdapter } from "../adapters";
import { TicketServiceInterface } from "./interfaces";
import { DbAdapterInterface } from "../adapters/interfaces";
import { Ticket } from "../types";

import { logger } from "../utils";
import { LOGGER_MESSAGE } from "../constants";

export default class TicketService implements TicketServiceInterface {
  private simpleDbAdapter: DbAdapterInterface;

  constructor() {
    this.simpleDbAdapter = new SimpleDbAdapter();
  }
  public createTicket(): number {
    const ticketId = this.simpleDbAdapter.addTicket();
    logger.info(LOGGER_MESSAGE.TICKET_SERVICE_TICKET_ADDED);

    return ticketId;
  }

  public getTickets(): Ticket[] {
    const tickets = this.simpleDbAdapter.getTickets();

    logger.info(LOGGER_MESSAGE.TICKET_SERVICE_TICKETS_RETURNED);
    return tickets;
  }

  public getTicket(ticketId: number): Ticket {
    const ticket = this.simpleDbAdapter.getTicket(ticketId);

    logger.info(LOGGER_MESSAGE.TICKET_SERVICE_TICKET_RETURNED);
    return ticket;
  }

  public verifyTicket(ticketId: number): number {
    const ticketStatus = this.simpleDbAdapter.verifyTicket(ticketId);

    logger.info(LOGGER_MESSAGE.TICKET_SERVICE_TICKET_VERIFIED);
    return ticketStatus;
  }

  public amendTicket(ticketId: number): void {
    this.simpleDbAdapter.updateTicket(ticketId);

    logger.info(LOGGER_MESSAGE.TICKET_SERVICE_TICKET_AMENDED);
  }
}
