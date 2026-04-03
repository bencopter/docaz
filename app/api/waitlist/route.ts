import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) {
    return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: normalized });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "You're already on the list." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to join. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
