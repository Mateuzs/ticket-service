export default class TicketVerifiedException extends Error {
  public ticketId: any;

  constructor(message: string, ticketId: any) {
    super(message);

    this.ticketId = ticketId;
  }
}
