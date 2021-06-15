import { validateTicketId } from "../../../src/utils";

describe("validateTickeId function", () => {
  test("should return true for valid integer value", () => {
    expect(validateTicketId("0")).toEqual(true);
  });

  test("should return true for valid integer value", () => {
    expect(validateTicketId("30")).toEqual(true);
  });

  test("should return true for valid integer value", () => {
    expect(validateTicketId("120")).toEqual(true);
  });

  test("should return false for invalid integer value", () => {
    expect(validateTicketId("a")).toEqual(false);
  });

  test("should return false for invalid integer value", () => {
    expect(validateTicketId("#")).toEqual(false);
  });
  test("should return false for invalid integer value", () => {
    expect(validateTicketId("asdf@3.")).toEqual(false);
  });

  test("should return false for invalid integer value", () => {
    expect(validateTicketId("")).toEqual(false);
  });
});
