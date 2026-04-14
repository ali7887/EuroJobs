import { NextRequest, NextResponse } from "next/server";
import { hybridSearchService } from "@/lib/services/search/hybrid-search.service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = body.query?.trim();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = await hybridSearchService.search(query);

  return NextResponse.json({ results });
}
