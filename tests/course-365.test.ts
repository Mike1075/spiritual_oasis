import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { companion365 } from "../src/data/courses/companion365";

describe("companion365 data", () => {
  it("is valid", () => {
    expect(validateCourseDetail(companion365)).toEqual([]);
  });
  it("is a companion service that links to /calendar", () => {
    expect(companion365.leadSource).toBe("service-365");
    expect(companion365.pillar).toBe("companion");
    expect(companion365.cta?.href).toBe("/calendar");
  });
});
