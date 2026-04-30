import { NextResponse } from "next/server";
import { getAdminStats } from "@/lib/admin/getStats";

export async function GET() {
  try {
    const stats = await getAdminStats();

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}
