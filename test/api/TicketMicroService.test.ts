import axios from "axios";

import app from "../../src/app";
import { ERROR_MESSAGE } from "../../src/constants";

jest.mock("../../src/utils/logger", () => {
  return {
    info: () => jest.fn(),
    warn: () => jest.fn(),
    error: () => jest.fn(),
  };
});

const endpointApiAmendTicket = "/ticket";
const endpointApiCreateTicket = "/ticket";
const endpointApiGetTicket = "/ticket";
const endpointApiGetTickets = "/ticket";
const endpointApiVerifyTicket = "/status";

const ticketIdValid = 0;
const ticketIdValid2 = 1;
const ticketIdInvalid = "invalid-id";

const testingPort = app.get("port");
const ticketServiceOrigin = `http://localhost:${testingPort}`;

let ticketService;

describe("getRewards V1 endpoint", () => {
  beforeAll(() => {
    ticketService = app.listen(app.get("port"));
  });

  afterAll(() => {
    // @ts-ignore
    ticketService.close();
  });

  test(`POST request to ${endpointApiCreateTicket} creates new ticket`, async () => {
    const result = await axios.post(
      `${ticketServiceOrigin}${endpointApiCreateTicket}`
    );

    expect(result.status).toEqual(200);
    expect(result.data).toEqual({ id: 0 });
  });

  test(`GET request to ${endpointApiGetTicket} returns ticket`, async () => {
    const result = await axios.get(
      `${ticketServiceOrigin}${endpointApiGetTicket}/${ticketIdValid}`
    );

    expect(result.status).toEqual(200);
    const ticket = result.data;

    expect(ticket.id).toEqual(0);
    expect(ticket.status).toEqual(null);
    expect(ticket.verified).toEqual(false);
    expect(ticket.numbers).toBeTruthy();
  });

  test(`GET request to ${endpointApiGetTicket} with invalid param returns error`, async () => {
    try {
      await axios.get(
        `${ticketServiceOrigin}${endpointApiGetTicket}/${ticketIdInvalid}`
      );
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual({
        code: 400,
        msg: ERROR_MESSAGE.INVALID_ID,
      });
    }
  });

  test(`GET request to ${endpointApiGetTicket} with not existing id returns error`, async () => {
    try {
      await axios.get(
        `${ticketServiceOrigin}${endpointApiGetTicket}/${ticketIdValid2}`
      );
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data).toEqual({
        code: 404,
        msg: ERROR_MESSAGE.NO_TICKET_FOR_GIVEN_ID,
      });
    }
  });

  test(`GET request to ${endpointApiGetTickets} returns ticket list`, async () => {
    const result = await axios.get(
      `${ticketServiceOrigin}${endpointApiGetTickets}`
    );

    expect(result.status).toEqual(200);
    expect(Array.isArray(result.data)).toEqual(true);
    const [ticket] = result.data;

    expect(ticket.id).toEqual(0);
    expect(ticket.status).toEqual(null);
    expect(ticket.verified).toEqual(false);
    expect(ticket.numbers).toBeTruthy();
  });

  test(`PUT request to ${endpointApiAmendTicket} updates ticket with new lines`, async () => {
    const result = await axios.put(
      `${ticketServiceOrigin}${endpointApiAmendTicket}/${ticketIdValid}`
    );

    expect(result.status).toEqual(200);
  });

  test(`PUT request to ${endpointApiVerifyTicket} for existing ticket`, async () => {
    const result = await axios.put(
      `${ticketServiceOrigin}${endpointApiVerifyTicket}/${ticketIdValid}`
    );

    expect(result.status).toEqual(200);
    console.log(result.data);
    expect(typeof result.data.status).toEqual("number");
  });

  test(`PUT request to ${endpointApiVerifyTicket} for non existing ticket returns 404 error`, async () => {
    try {
      await axios.put(
        `${ticketServiceOrigin}${endpointApiVerifyTicket}/${ticketIdValid2}`
      );
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data).toEqual({
        code: 404,
        msg: ERROR_MESSAGE.NO_TICKET_FOR_GIVEN_ID,
      });
    }
  });

  test(`PUT request to ${endpointApiAmendTicket} after status verification returns 403 error`, async () => {
    try {
      await axios.put(
        `${ticketServiceOrigin}${endpointApiAmendTicket}/${ticketIdValid}`
      );
    } catch (error) {
      expect(error.response.status).toEqual(403);
      expect(error.response.data).toEqual({
        code: 403,
        msg: ERROR_MESSAGE.TICKET_ALREADY_VERIFIED,
      });
    }
  });

  test(`PUT request to ${endpointApiAmendTicket} for non existing ticket returns 404 error`, async () => {
    try {
      await axios.put(
        `${ticketServiceOrigin}${endpointApiAmendTicket}/${ticketIdValid2}`
      );
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data).toEqual({
        code: 404,
        msg: ERROR_MESSAGE.NO_TICKET_FOR_GIVEN_ID,
      });
    }
  });
});
