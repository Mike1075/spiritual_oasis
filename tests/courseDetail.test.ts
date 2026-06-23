import { describe, it, expect } from "vitest";
import { validateCourseDetail, type CourseDetailData } from "../src/data/courses/types";

const good: CourseDetailData = {
  id: "x",
  leadSource: "course-x",
  pillar: "growth",
  title: "标题",
  subtitle: "副标题",
  intro: ["一段"],
  forWhom: ["某人"],
  experience: ["某体验"],
};

describe("validateCourseDetail", () => {
  it("passes a complete object", () => {
    expect(validateCourseDetail(good)).toEqual([]);
  });
  it("flags missing required string fields", () => {
    const bad = { ...good, title: "", leadSource: "" };
    const errs = validateCourseDetail(bad);
    expect(errs).toContain("missing title");
    expect(errs).toContain("missing leadSource");
  });
  it("flags empty list fields", () => {
    const bad = { ...good, intro: [], forWhom: [], experience: [] };
    const errs = validateCourseDetail(bad);
    expect(errs).toContain("intro empty");
    expect(errs).toContain("forWhom empty");
    expect(errs).toContain("experience empty");
  });
});
