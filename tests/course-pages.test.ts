import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { kuayue } from "../src/data/courses/kuayue";
import { canchan } from "../src/data/courses/canchan";
import { companion365 } from "../src/data/courses/companion365";

describe("all course detail pages", () => {
  const all = [kuayue, canchan, companion365];
  it("all valid", () => {
    for (const d of all) expect(validateCourseDetail(d)).toEqual([]);
  });
  it("lead sources are unique", () => {
    const sources = all.map((d) => d.leadSource);
    expect(new Set(sources).size).toBe(sources.length);
  });
});
