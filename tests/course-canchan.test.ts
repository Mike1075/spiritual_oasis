import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { canchan } from "../src/data/courses/canchan";

describe("canchan course data", () => {
  it("is valid", () => {
    expect(validateCourseDetail(canchan)).toEqual([]);
  });
  it("uses its unique lead source and growth pillar", () => {
    expect(canchan.leadSource).toBe("course-canchan");
    expect(canchan.pillar).toBe("growth");
  });
});
