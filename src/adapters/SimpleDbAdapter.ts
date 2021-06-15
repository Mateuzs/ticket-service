import NodeCache from "node-cache";

import { DbAdapterInterface } from "./interfaces";
import { Ticket } from "../types";

import { logger } from "../utils";
import {
  ERROR_MESSAGE,
  LINE_LENGTH,
  LOGGER_MESSAGE,
  NUMBER_RANGE,
  TICKET_LENGTH,
} from "../constants";
import { NoTicketException, TicketVerifiedException } from "../exceptions";

export default class SimpleDbAdapter implements DbAdapterInterface {
  private static cache = new NodeCache();

  public addTicket(): number {
    const newTicketId = SimpleDbAdapter.cache.keys().length;

    const newTicket: Ticket = {
      id: newTicketId,
      numbers: this.createNewTicketLines(),
      status: null,
      verified: false,
    };

    SimpleDbAdapter.cache.set(newTicketId, newTicket);
    logger.info(LOGGER_MESSAGE.SIMPLE_DB_ADAPTER_TICKET_ADDED);

    return newTicketId;
  }

  public getTickets(): Ticket[] {
    const ticketKeys = SimpleDbAdapter.cache.keys();
    const ticketsObject = SimpleDbAdapter.cache.mget(ticketKeys);
    const tickets: Ticket[] = Object.values(
      ticketsObject
    ) as unknown as Ticket[];

    logger.info(LOGGER_MESSAGE.SIMPLE_DB_ADAPTER_TICKETS_FETCHED);
    return tickets.sort(this.sortTickets) as unknown as Ticket[];
  }

  public getTicket(ticketId: number): Ticket {
    const ticket = SimpleDbAdapter.cache.get(ticketId);

    if (!ticket) {
      throw new NoTicketException(
        ERROR_MESSAGE.NO_TICKET_FOR_GIVEN_ID,
        ticketId
      );
    }

    logger.info(LOGGER_MESSAGE.SIMPLE_DB_ADAPTER_TICKET_FOUND);
    return ticket as Ticket;
  }

  public verifyTicket(ticketId: number): number {
    const ticket = SimpleDbAdapter.cache.get(ticketId) as Ticket;

    if (!ticket) {
      throw new NoTicketException(
        ERROR_MESSAGE.NO_TICKET_FOR_GIVEN_ID,
        ticketId
      );
    }

    if (ticket.verified) {
      return ticket.status!;
    }

    SimpleDbAdapter.cache.del(ticketId);

    const ticketStatus = this.checkTicketStatus(ticket);
    const newTicket = { ...ticket, status: ticketStatus, verified: true };

    SimpleDbAdapter.cache.set(ticket.id, newTicket);
    logger.info(LOGGER_MESSAGE.SIMPLE_DB_ADAPTER_TICKET_UPDATED);

    return ticketStatus;
  }

  public updateTicket(ticketId: number): void {
    const ticket = SimpleDbAdapter.cache.get(ticketId) as Ticket;

    if (!ticket) {
      throw new NoTicketException(
        ERROR_MESSAGE.NO_TICKET_FOR_GIVEN_ID,
        ticketId
      );
    }

    if (ticket.verified) {
      throw new TicketVerifiedException(
        ERROR_MESSAGE.TICKET_ALREADY_VERIFIED,
        ticketId
      );
    }

    SimpleDbAdapter.cache.del(ticketId);
    const newTicketLines = this.createNewTicketLines();
    SimpleDbAdapter.cache.set(ticket.id, {
      ...ticket,
      numbers: newTicketLines,
    });
    logger.info(LOGGER_MESSAGE.SIMPLE_DB_ADAPTER_TICKET_UPDATED);
  }

  private createNewTicketLines(): number[][] {
    return Array.from({ length: TICKET_LENGTH }).map((_e) =>
      Array.from({ length: LINE_LENGTH }, () =>
        Math.floor(Math.random() * NUMBER_RANGE)
      )
    );
  }

  private checkTicketStatus(ticket: Ticket): number {
    const ticketNumbers = ticket.numbers.map((line) => [...line]);

    if (this.isEveryLineSumEqualTo2(ticketNumbers)) {
      return 10;
    } else if (this.isEveryNumberTheSame(ticketNumbers)) {
      return 5;
    } else if (this.isFirstNumberInLineDifferent(ticketNumbers)) {
      return 1;
    } else {
      return 0;
    }
  }

  private isEveryLineSumEqualTo2(ticketNumbers: number[][]): boolean {
    return ticketNumbers.every(
      (line) => line.reduce((sum: number, elem: number) => sum + elem, 0) === 2
    );
  }

  private isEveryNumberTheSame(ticketNumbers: number[][]): boolean {
    const numberSample = ticketNumbers[0][0];
    return ticketNumbers.every((line) =>
      line.every((elem) => elem === numberSample)
    );
  }

  private isFirstNumberInLineDifferent(ticketNumbers: number[][]): boolean {
    return ticketNumbers.every((line: number[]) => {
      const firstNumber = line.shift();
      return line.every((elem: number) => elem !== firstNumber);
    });
  }

  private sortTickets(ticket1: Ticket, ticket2: Ticket): number {
    return (
      (ticket2.status !== null ? ticket2.status : -Infinity) -
      (ticket1.status !== null ? ticket1.status : -Infinity)
    );
  }
}
