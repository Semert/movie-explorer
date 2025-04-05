import { formatDate, formatRuntime } from "../../utils/formatters";

describe("formatDate utility", () => {
  test("formats date string correctly", () => {
    const dateString = "2021-07-15";
    const result = formatDate(dateString);
    expect(result).toBe("July 15, 2021");
  });

  test("returns N/A for empty date string", () => {
    expect(formatDate("")).toBe("N/A");
  });

  test('returns N/A for "N/A" input', () => {
    expect(formatDate("N/A")).toBe("N/A");
  });

  test("handles invalid date gracefully", () => {
    const invalidDate = "not-a-date";
    expect(formatDate(invalidDate)).toBe(invalidDate);
  });
});

describe("formatRuntime utility", () => {
  test('passes through runtime with "min" already in it', () => {
    expect(formatRuntime("120 min")).toBe("120 min");
  });

  test('adds "min" to numeric string', () => {
    expect(formatRuntime("135")).toBe("135 min");
  });

  test("returns N/A for empty runtime", () => {
    expect(formatRuntime("")).toBe("N/A");
  });

  test('returns N/A for "N/A" input', () => {
    expect(formatRuntime("N/A")).toBe("N/A");
  });

  test("passes through non-numeric strings without adding min", () => {
    expect(formatRuntime("unknown")).toBe("unknown");
  });
});
