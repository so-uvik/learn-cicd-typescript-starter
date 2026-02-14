import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns API key for valid Authorization header", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
    };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  test("returns API key for valid Authorization header with long key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey long-api-key-with-dashes-and-numbers-123",
    };
    expect(getAPIKey(headers)).toBe("long-api-key-with-dashes-and-numbers-123");
  });

  test("preserves extra spaces in API key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey   spaced_key  ",
    };
    expect(getAPIKey(headers)).toBe("");
  });

  test("returns null for missing authorization header", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for undefined authorization header", () => {
    const headers: IncomingHttpHeaders = {
      authorization: undefined,
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for Bearer token (wrong prefix)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for lowercase 'apikey' (case sensitive)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey abc123",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for uppercase 'APIKEY' (case sensitive)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "APIKEY abc123",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for Authorization header without space", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKeyabc123",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for Authorization header with only 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for empty authorization header", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns null for wrong prefix", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "NotApiKey abc123",
    };
    expect(getAPIKey(headers)).toBe(null);
  });

  test("returns second part for multi-part API key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc def ghi",
    };
    expect(getAPIKey(headers)).toBe("abc");
  });

  test("handles authorization header with multiple spaces", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey     abc123",
    };
    expect(getAPIKey(headers)).toBe("");
  });
});
