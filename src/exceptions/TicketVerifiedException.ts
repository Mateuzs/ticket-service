export default class TicketVerifiedException extends Error {
  public ticketId: number;

  constructor(message: string, ticketId: number) {
    super(message);

    this.ticketId = ticketId;
  }
}
