import { describe, it, expect } from "vitest";
import { hasCover } from "../src/components/academy/CourseCard";

describe("hasCover", () => {
  it("true for /images path", () => expect(hasCover("/images/academy/x.jpg")).toBe(true));
  it("false for empty", () => expect(hasCover("")).toBe(false));
  it("false for undefined", () => expect(hasCover(undefined)).toBe(false));
});
