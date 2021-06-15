import { TicketService } from "../../../src/services";

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

const ticketIdValid = 0;

jest.mock("../../../src/adapters/SimpleDbAdapter.ts", () => {
  return function () {
    return {
      addTicket: jest.fn().mockImplementation(() => {
        return mockedTicket1.id;
      }),
      getTicket: jest.fn().mockImplementation((id: number) => {
        if (id === ticketIdValid) {
          return mockedTicket1;
        }
      }),
      getTickets: jest.fn().mockImplementation(() => {
        return [mockedTicket1];
      }),
      verifyTicket: jest.fn().mockImplementation((id: number) => {
        if (id === ticketIdValid) {
          return 0;
        }
      }),
      updateTicket: jest.fn(),
    };
  };
});

describe("TicketService", () => {
  const ticketService = new TicketService();

  describe("createTicket method", () => {
    test("should return id of created ticket", () => {
      const result = ticketService.createTicket();

      expect(result).toEqual(ticketIdValid);
    });
  });

  describe("getTicket method", () => {
    test("should get ticket if exists", () => {
      const result = ticketService.getTicket(ticketIdValid);

      expect(result).toEqual(mockedTicket1);
    });
  });

  describe("getTickets method", () => {
    test("should get list of tickets", () => {
      const result = ticketService.getTickets();

      expect(result).toEqual([mockedTicket1]);
    });
  });

  describe("verifyTicket method", () => {
    test("should return status of verified ticket", () => {
      const result = ticketService.verifyTicket(ticketIdValid);

      expect(result).toEqual(0);
    });
  });
});
