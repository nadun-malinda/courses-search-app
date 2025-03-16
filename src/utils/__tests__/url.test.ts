import { normalizeQueryString, getQueryParams } from "../url";

describe("normalizeQueryString", () => {
  it("should sort query parameters alphabeticaly", () => {
    const queryString = "b=2&a=1";
    const result = normalizeQueryString(queryString);
    expect(result).toBe("a=1&b=2");
  });

  it("should return a normalized query string even if the parameters are already sorted", () => {
    const queryString = "a=1&b=2";
    const result = normalizeQueryString(queryString);
    expect(result).toBe("a=1&b=2");
  });

  it("should handle an empty query string", () => {
    const queryString = "";
    const result = normalizeQueryString(queryString);
    expect(result).toBe("");
  });
});

describe("getQueryParams", () => {
  it("should extract query parameters and split category and location by commas", () => {
    const queryString = "category=Media,Tech&location=stockholm,q1&q=journ";
    const result = getQueryParams(queryString);
    expect(result).toEqual({
      category: ["Media", "Tech"],
      location: ["stockholm", "q1"],
      q: "journ",
    });
  });

  it("should return null for missing category, location, or q parameters", () => {
    const queryString = "category=Media&location=stockholm";
    const result = getQueryParams(queryString);
    expect(result).toEqual({
      category: ["Media"],
      location: ["stockholm"],
      q: null,
    });
  });

  it("should handle query string with missing parameters", () => {
    const queryString = "category=&location=";
    const result = getQueryParams(queryString);
    expect(result).toEqual({
      category: [""],
      location: [""],
      q: null,
    });
  });

  it("should return null when query string is empty", () => {
    const queryString = "";
    const result = getQueryParams(queryString);
    expect(result).toEqual({
      category: null,
      location: null,
      q: null,
    });
  });
});
