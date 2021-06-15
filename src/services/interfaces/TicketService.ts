import { Ticket } from "../../types";

export default interface TicketServiceInterface {
  createTicket(): number;
  getTicket(ticketId: number): Ticket;
  getTickets(): Ticket[];
  verifyTicket(ticketId: number): number;
  amendTicket(tickedId: number): void;
}
