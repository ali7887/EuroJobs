import { NextResponse } from "next/server";
import { getJobById } from "@/lib/db/queries/jobs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getJobById(Number(params.id));

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);

  } catch (err) {
    console.error("Get Job Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
