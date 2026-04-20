//ok
import { NextResponse } from "next/server";
import { withRole } from "../../with-role";

export const GET = withRole(
  ["ADMIN"],
  async (req, user) => {
    return NextResponse.json({
      message: "admin access granted",
      user,
    });
  }
);



