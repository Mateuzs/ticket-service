import { Ticket } from "../../types";

export default interface DbAdapterInterface {
  addTicket(): number;
  getTicket(ticketId: number): Ticket;
  getTickets(): Ticket[];
  verifyTicket(ticketId: number): number;
  updateTicket(ticketId: number): void;
}
