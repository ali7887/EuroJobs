import { withRole } from "../../with-role";

export const GET = withRole(
  ["ADMIN"],
  async (req, user) => {

    return Response.json({
      message: "admin access granted",
      user
    });

  }
);
