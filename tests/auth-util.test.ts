import { describe, it, expect } from "vitest";
import { isAdminRole } from "../src/lib/auth";
describe("isAdminRole", () => {
  it("admin/finance => true", () => { expect(isAdminRole("admin")).toBe(true); expect(isAdminRole("finance")).toBe(true); });
  it("user/null => false", () => { expect(isAdminRole("user")).toBe(false); expect(isAdminRole(null)).toBe(false); });
});
