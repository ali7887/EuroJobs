import { NextResponse } from "next/server";
import { createCompany } from "@/lib/db/queries/companies";
import { z } from "zod";

const CompanySchema = z.object({
  name: z.string().min(2),
  ownerId: z.string().uuid(),         // UUID string (اصلاح اصلی)
  logoUrl: z.string().optional(),
  website: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = CompanySchema.parse(body);

    const company = await createCompany(data);

    return NextResponse.json(company, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
