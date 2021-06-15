export const ENV_PORT = "port";

// http codes
export const HTTP_STATUS_CODE_ERROR_CLIENT_NOT_FOUND = 404;
export const HTTP_STATUS_CODE_ERROR_CLIENT_UNAUTHORIZED = 403;
export const HTTP_STATUS_CODE_ERROR_CLIENT_BAD_REQUEST = 400;

export const HTTP_STATUS_OK = 200;

// routes
export const ENDPOINT_API_CREATE_TICKET = "/ticket";
export const ENDPOINT_API_GET_TICKET = "/ticket/:id";
export const ENDPOINT_API_GET_TICKETS = "/ticket";
export const ENDPOINT_API_VERIFY_TICKET = "/status/:id";
export const ENDPOINT_API_AMEND_TICKET = "/ticket/:id";

export const TICKET_LENGTH = 5;
export const LINE_LENGTH = 3;
export const NUMBER_RANGE = 3;

// logger messages
export const enum LOGGER_MESSAGE {
  RUNNING = "App running on port:",

  CREATE_TICKET_REQUEST_RECEIVED = "createTicket request received",
  CREATE_TICKET_RESPONSE_RETURNED = "createTicket response returned",
  GET_TICKET_REQUEST_RECEIVED = "getTicket request received",
  GET_TICKET_RESPONSE_RETURNED = "getTicket response returned",
  GET_TICKETS_REQUEST_RECEIVED = "getTickets request received",
  GET_TICKETS_RESPONSE_RETURNED = "getTickets response returned",
  VERIFY_TICKET_REQUEST_RECEIVED = "verifyTicket request received",
  VERIFY_TICKET_RESPONSE_RETURNED = "verifyTicket response returned",
  AMEND_TICKET_REQUEST_RECEIVED = "amendTicket request received",
  AMEND_TICKET_RESPONSE_RETURNED = "amendTicket response returned",

  TICKET_SERVICE_TICKET_ADDED = "TicketService ticket added",
  TICKET_SERVICE_TICKET_RETURNED = "TicketService ticket returned",
  TICKET_SERVICE_TICKETS_RETURNED = "TicketService tickets returned",
  TICKET_SERVICE_TICKET_VERIFIED = "TicketService ticket verified",
  TICKET_SERVICE_TICKET_AMENDED = "TicketService ticket amended",

  SIMPLE_DB_ADAPTER_TICKET_ADDED = "SimpleDbAdapter ticket created",
  SIMPLE_DB_ADAPTER_TICKET_FOUND = "SimpleDbAdapter ticket found",
  SIMPLE_DB_ADAPTER_TICKETS_FETCHED = "SimpleDbAdapter tickets fetched",
  SIMPLE_DB_ADAPTER_TICKET_CHECKED = "SimpleDbAdapter ticket checked",
  SIMPLE_DB_ADAPTER_TICKET_UPDATED = "SimpleDbAdapter ticket updated",
}

export const enum ERROR_MESSAGE {
  NO_TICKET_FOR_GIVEN_ID = "ticket does not exist for provided id",
  TICKET_ALREADY_VERIFIED = "ticket is already verified",
  INVALID_ID = "invalid id",
}
