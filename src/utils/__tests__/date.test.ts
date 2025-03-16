import { getFormattedDate } from "../date";

describe("getFormattedDate", () => {
  it("should return the formatted date for a valid date string", () => {
    const validDate = "2023-01-01T00:00:00Z"; // ISO string format
    const result = getFormattedDate(validDate);
    expect(result).toBe("Jan 1, 2023");
  });

  it("should return 'Date not available' for an invalid date string", () => {
    const invalidDate = "invalid-date";
    const result = getFormattedDate(invalidDate);
    expect(result).toBe("Date not available");
  });

  it("should return 'Date not available' for an empty string", () => {
    const emptyDate = "";
    const result = getFormattedDate(emptyDate);
    expect(result).toBe("Date not available");
  });

  it("should return 'Date not available' for a malformed date string", () => {
    const malformedDate = "2023-99-99"; // Invalid date
    const result = getFormattedDate(malformedDate);
    expect(result).toBe("Date not available");
  });
});
