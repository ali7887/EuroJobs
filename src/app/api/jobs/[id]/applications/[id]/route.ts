import { NextResponse } from "next/server";
import { updateApplicationStatus } from "@/lib/db/queries/applications";
import { z } from "zod";

const StatusSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"])
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status } = StatusSchema.parse(body);

    const updated = await updateApplicationStatus(
      Number(params.id),
      status
    );

    return NextResponse.json(updated);

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
