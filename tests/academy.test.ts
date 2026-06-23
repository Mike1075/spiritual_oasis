import { describe, it, expect } from "vitest";
import { PILLARS } from "../src/data/academy";

describe("academy data", () => {
  it("has exactly 3 pillars in order", () => {
    expect(PILLARS.map((p) => p.id)).toEqual(["future", "growth", "companion"]);
  });
  it("every course has a non-empty href and bilingual title", () => {
    const courses = PILLARS.flatMap((p) => p.courses);
    expect(courses.length).toBeGreaterThan(0);
    for (const c of courses) {
      expect(c.href).toBeTruthy();
      expect(c.titleZh).toBeTruthy();
      expect(c.titleEn).toBeTruthy();
    }
  });
  it("external courses use absolute urls", () => {
    const ext = PILLARS.flatMap((p) => p.courses).filter((c) => c.external);
    for (const c of ext) expect(c.href.startsWith("http")).toBe(true);
  });
});
