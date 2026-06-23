import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { kuayue } from "../src/data/courses/kuayue";

describe("kuayue course data", () => {
  it("is valid", () => {
    expect(validateCourseDetail(kuayue)).toEqual([]);
  });
  it("uses its unique lead source and growth pillar", () => {
    expect(kuayue.leadSource).toBe("course-kuayue");
    expect(kuayue.pillar).toBe("growth");
  });
});
