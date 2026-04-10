import { NextRequest, NextResponse } from "next/server";
import { ApplicationService } from "@/lib/services/application.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = Number(id);

    const application =
      await ApplicationService.getApplicationsByJob(idNum);

    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(application);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = Number(id);

    const body = await req.json();

    const result =
      await ApplicationService.updateStatus(idNum, body);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = Number(id);

    const result =
      await ApplicationService.deleteApplication(idNum);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    );
  }
}
