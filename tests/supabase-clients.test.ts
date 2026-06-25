import { describe, it, expect } from "vitest";
describe("supabase ssr clients", () => {
  it("client.ts exports createBrowserSupabase", async () => {
    const mod = await import("../src/lib/supabase/client");
    expect(typeof mod.createBrowserSupabase).toBe("function");
  });
  it("server.ts exports createServerSupabase", async () => {
    const mod = await import("../src/lib/supabase/server");
    expect(typeof mod.createServerSupabase).toBe("function");
  });
});
