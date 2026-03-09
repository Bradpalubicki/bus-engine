import { NextResponse } from "next/server";

// Bus Engine onboarding progress — stored in localStorage on the client.
// DB persistence happens when settings page is filled out.
// This endpoint exists to satisfy the wizard's fetch call gracefully.

export async function PATCH() {
  return NextResponse.json({ ok: true });
}
