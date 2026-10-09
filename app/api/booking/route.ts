import { NextRequest, NextResponse } from "next/server";

const BOOKING_WEBHOOK =
  process.env.BOOKING_WEBHOOK_URL ||
  "https://n8n.srv1457832.hstgr.cloud/webhook/kongllective-booking";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action;

    if (action !== "availability" && action !== "book") {
      return NextResponse.json(
        { ok: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    const res = await fetch(BOOKING_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { ok: false, error: "Booking service unavailable" },
      { status: 500 }
    );
  }
}
