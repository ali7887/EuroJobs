import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";

type Params = {
  params: Promise<{ userId: string }>;
};

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  const { userId } = await params;
  const userIdNum = Number(userId);

  const applications =
    await ApplicationService.getByUser(userIdNum);

  return NextResponse.json(applications);
}
