import { NextRequest, NextResponse } from "next/server";
import { AuthContext } from "@/lib/auth/auth.context";
import { getUserFromRequest } from "@/lib/auth/get-user";

type WithAuthContext<P = any> = {
  params: P;
  user: AuthContext;
};

type WithAuthHandler<P = any> = (
  req: NextRequest,
  ctx: WithAuthContext<P>
) => Promise<Response>;

export function withAuth<P = any>(handler: WithAuthHandler<P>) {
  return async (
    req: NextRequest,
    ctx: { params: P }
  ): Promise<Response> => {
    try {
      const user = await getUserFromRequest(req);

      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      return await handler(req, {
        ...ctx,
        user,
      });
    } catch (error) {
      console.error("withAuth error:", error);

      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
