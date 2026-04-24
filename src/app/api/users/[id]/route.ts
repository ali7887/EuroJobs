import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // UUID → string، پس Number(id) ممنوع
    const user = await userService.getUserById(id);

    return NextResponse.json(user);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
