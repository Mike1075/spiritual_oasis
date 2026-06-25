import { describe, it, expect } from "vitest";
import { yuanFromFen } from "../src/lib/catalog";

describe("yuanFromFen", () => {
  it("798000 fen → ¥7980", () => {
    expect(yuanFromFen(798000)).toBe("¥7980");
  });
  it("990 fen → ¥9.9", () => {
    expect(yuanFromFen(990)).toBe("¥9.9");
  });
  it("299900 fen → ¥2999", () => {
    expect(yuanFromFen(299900)).toBe("¥2999");
  });
});
