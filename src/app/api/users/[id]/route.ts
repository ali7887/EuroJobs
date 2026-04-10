import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";
import { ZodError } from "zod";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const user = await userService.getUserById(idNum);
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const body = await req.json();

    const user = await userService.updateUser(idNum, body);

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues
,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message === "User not found") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const idNum = Number(id);

    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const result = await userService.deleteUser(idNum);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
