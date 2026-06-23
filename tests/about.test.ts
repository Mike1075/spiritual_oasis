import { describe, it, expect } from "vitest";
import { ABOUT, validateAbout } from "../src/data/about";

describe("about data", () => {
  it("passes validation", () => {
    expect(validateAbout(ABOUT)).toEqual([]);
  });
  it("timeline entries are bilingual and chronological", () => {
    const years = ABOUT.timeline.map((t) => Number(t.year));
    expect(years.length).toBeGreaterThan(0);
    for (const t of ABOUT.timeline) {
      expect(t.zhTitle).toBeTruthy();
      expect(t.enTitle).toBeTruthy();
    }
    const sorted = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sorted);
  });
  it("cobuilder section has a lead source", () => {
    expect(ABOUT.cobuilder.leadSource).toBe("cobuilder");
  });
});
