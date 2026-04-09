import { withAuth } from "../../api/with-auth";

export const GET = withAuth(async (req, user) => {

  return Response.json({
    user
  });

});
