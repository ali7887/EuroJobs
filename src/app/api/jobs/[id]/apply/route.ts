import { NextResponse } from "next/server";
import { applyToJob } from "@/lib/db/queries/applications";
import { z } from "zod";

const ApplySchema = z.object({
  userId: z.number(),
  resumePath: z.string().optional(),
  coverLetter: z.string().optional()
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const data = ApplySchema.parse(body);

    const application = await applyToJob({
      jobId: Number(params.id),
      userId: data.userId,
      resumePath: data.resumePath,
      coverLetter: data.coverLetter
    });

    return NextResponse.json(application, { status: 201 });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
