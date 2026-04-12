import { NextResponse } from "next/server";
import { createJob } from "@/lib/db/queries/jobs";
import { z } from "zod";

const CreateJobSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  location: z.string().optional(),
  salary: z.number().optional(),
  type: z.string().optional(),
  companyId: z.number().optional(),
  employerId: z.number()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = CreateJobSchema.parse(body);

    const job = await createJob(data);

    return NextResponse.json(job, { status: 201 });

  } catch (err) {
    console.error("Cr Job Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
