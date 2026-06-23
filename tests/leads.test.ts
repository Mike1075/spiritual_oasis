import { describe, it, expect } from "vitest";
import { parseLead } from "../src/lib/leads";

describe("parseLead", () => {
  it("rejects missing name", () => {
    const r = parseLead({ contact: "13800000000", source: "home" });
    expect(r.ok).toBe(false);
  });
  it("rejects missing contact", () => {
    const r = parseLead({ name: "张三", source: "home" });
    expect(r.ok).toBe(false);
  });
  it("accepts and trims valid input", () => {
    const r = parseLead({ name: "  张三 ", contact: " 13800000000 ", source: "home", pillar: "growth" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.name).toBe("张三");
      expect(r.data.contact).toBe("13800000000");
      expect(r.data.pillar).toBe("growth");
    }
  });
  it("caps overly long fields", () => {
    const r = parseLead({ name: "x".repeat(100), contact: "y".repeat(100), source: "home" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.name.length).toBeLessThanOrEqual(40);
  });
});
