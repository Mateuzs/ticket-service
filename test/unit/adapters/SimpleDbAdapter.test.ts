import { SimpleDbAdapter } from "../../../src/adapters";
import {
  NoTicketException,
  TicketVerifiedException,
} from "../../../src/exceptions";
import { Ticket } from "../../../src/types";

const mockedNewLines = [
  [0, 2, 1],
  [2, 2, 0],
  [0, 2, 0],
  [2, 2, 1],
  [2, 2, 2],
];

const mockedTicket1 = {
  id: 0,
  numbers: [
    [0, 1, 2],
    [2, 1, 2],
    [0, 0, 1],
    [2, 1, 2],
    [2, 2, 1],
  ],
  status: null,
  verified: false,
};

const mockedTicket2 = {
  id: 1,
  numbers: [
    [0, 1, 2],
    [2, 1, 2],
    [0, 0, 1],
    [2, 1, 2],
    [2, 2, 1],
  ],
  status: 0,
  verified: true,
};

const ticketIdValid = 0;
const ticketIdInvalid = 1;
const ticketIdVerified = 2;

const mockedSetFunction = jest.fn();
const mockedDelFunction = jest.fn();

jest.mock("node-cache", () => {
  return function () {
    return {
      get: jest.fn().mockImplementation((id) => {
        if (id === 0) {
          return mockedTicket1;
        } else if (id === 2) {
          return mockedTicket2;
        } else {
          return undefined;
        }
      }),
      mget: jest.fn().mockImplementation(() => {
        return {
          0: mockedTicket1,
          1: mockedTicket2,
        };
      }),
      keys: jest.fn().mockImplementation(() => {
        return [0, 1];
      }),
      set: (id: number, ticket: Ticket) => mockedSetFunction(id, ticket),
      del: (id: number) => mockedDelFunction(id),
    };
  };
});

describe("SimpleDbAdapter", () => {
  const simpleDbAdapter = new SimpleDbAdapter();

  describe("addTicket Method", () => {
    test("create random ticket", () => {
      const createNewTicketLinesSpy = jest.spyOn(
        SimpleDbAdapter.prototype as any,
        "createNewTicketLines"
      );
      createNewTicketLinesSpy.mockImplementation(() => mockedNewLines);

      simpleDbAdapter.addTicket();

      expect(mockedSetFunction).toHaveBeenLastCalledWith(2, {
        id: 2,
        numbers: mockedNewLines,
        status: null,
        verified: false,
      });
    });
  });

  describe("getTicket Method", () => {
    test("should return ticket when exists and proper id provided", () => {
      const result = simpleDbAdapter.getTicket(ticketIdValid);

      expect(result).toEqual(mockedTicket1);
    });

    test("should throw exception when ticket does not exists and proper id provided", () => {
      try {
        simpleDbAdapter.getTicket(ticketIdInvalid);
      } catch (error) {
        expect(error instanceof NoTicketException).toEqual(true);
      }
    });
  });

  describe("getTickets Method", () => {
    test("should return a list of sorted available tickets when exist", () => {
      const result = simpleDbAdapter.getTickets();

      expect(result).toEqual([mockedTicket2, mockedTicket1]);
    });
  });

  describe("verifyTicket Method", () => {
    test("should verify and update ticket when exist", () => {
      const result = simpleDbAdapter.verifyTicket(ticketIdValid);

      expect(result).toEqual(0);
      expect(mockedDelFunction).toHaveBeenLastCalledWith(ticketIdValid);
      expect(mockedSetFunction).toHaveBeenLastCalledWith(ticketIdValid, {
        ...mockedTicket1,
        status: 0,
        verified: true,
      });
    });

    test("should throw exception when ticket does not exists and proper id provided", () => {
      try {
        simpleDbAdapter.verifyTicket(ticketIdInvalid);
      } catch (error) {
        expect(error instanceof NoTicketException).toEqual(true);
      }
    });
  });

  describe("updateTicket Method", () => {
    test("should update ticket when exists and not verified", () => {
      const createNewTicketLinesSpy = jest.spyOn(
        SimpleDbAdapter.prototype as any,
        "createNewTicketLines"
      );
      createNewTicketLinesSpy.mockImplementation(() => mockedNewLines);

      simpleDbAdapter.updateTicket(ticketIdValid);

      expect(mockedDelFunction).toHaveBeenLastCalledWith(ticketIdValid);
      expect(mockedSetFunction).toHaveBeenLastCalledWith(ticketIdValid, {
        ...mockedTicket1,
        numbers: mockedNewLines,
      });
    });

    test("should throw exception when ticket does not exists and proper id provided", () => {
      try {
        simpleDbAdapter.updateTicket(ticketIdInvalid);
      } catch (error) {
        expect(error instanceof NoTicketException).toEqual(true);
      }
    });

    test("should throw exception when ticket already verified", () => {
      try {
        simpleDbAdapter.updateTicket(ticketIdVerified);
      } catch (error) {
        expect(error instanceof TicketVerifiedException).toEqual(true);
      }
    });
  });
});
