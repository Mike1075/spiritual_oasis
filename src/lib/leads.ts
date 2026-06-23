export type LeadInput = {
  name: string;
  contact: string;
  source: string;
  pillar?: string;
  note?: string;
  utm?: string;
};

type ParseResult =
  | { ok: true; data: LeadInput }
  | { ok: false; error: string };

export function parseLead(input: unknown): ParseResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "请求格式错误" };
  }
  const b = input as Record<string, unknown>;
  const name = String(b.name ?? "").trim().slice(0, 40);
  const contact = String(b.contact ?? "").trim().slice(0, 60);
  const source = String(b.source ?? "").trim().slice(0, 40);
  if (!name) return { ok: false, error: "请填写称呼" };
  if (!contact) return { ok: false, error: "请填写联系方式" };
  if (!source) return { ok: false, error: "缺少来源" };
  return {
    ok: true,
    data: {
      name,
      contact,
      source,
      pillar: b.pillar ? String(b.pillar).slice(0, 40) : undefined,
      note: b.note ? String(b.note).slice(0, 500) : undefined,
      utm: b.utm ? String(b.utm).slice(0, 200) : undefined,
    },
  };
}
