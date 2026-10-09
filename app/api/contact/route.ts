type Lead = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

const text = (value: unknown, maxLength: number) => String(value ?? "").trim().slice(0, maxLength);

export async function POST(request: Request) {
  let input: Lead;
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    input = body;
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (text(input.website, 200)) return Response.json({ ok: true });

  const name = text(input.name, 120);
  const email = text(input.email, 254);
  const company = text(input.company, 160);
  const message = text(input.message, 4000);

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ ok: false, error: "Please complete the required fields" }, { status: 400 });
  }

  const webhookUrl =
    process.env.CONTACT_WEBHOOK_URL ||
    "https://n8n.srv1457832.hstgr.cloud/webhook/kongllective-contact";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ name, email, company, message, source: "kongllective.com" }),
    });
    if (!response.ok) throw new Error("Webhook rejected request");
  } catch {
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
