import { convert } from "./convert";

describe("currency converter test", () => {
  test("convert ISO format to number and back", () => {
    expect(convert("1.23")).toBe(123);
    expect(convert(123)).toBe("1.23");
  });

  test("convert wrong values", () => {
    const error = new Error("Value doesn't match format");
    expect(() => convert("asdw")).toThrow(error);
    expect(() => convert("123")).toThrow(error);
  });
});
