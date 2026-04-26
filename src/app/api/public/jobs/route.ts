import { NextResponse } from "next/server";
import { getJobsPaginated } from "@/lib/db/queries/jobs";

const validLevels = ["intern", "junior", "mid", "senior", "lead"] as const;
type JobLevel = typeof validLevels[number];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const remote = searchParams.get("remote") || "";

  const levelParam = searchParams.get("level");

  // Validate: convert string → JobLevel | undefined
  const level = validLevels.includes(levelParam as JobLevel)
    ? (levelParam as JobLevel)
    : undefined;

  const result = await getJobsPaginated({
    page,
    limit: 10,
    search,
    location,
    type,
    remote,
    level,
  });

  return NextResponse.json(result);
}
