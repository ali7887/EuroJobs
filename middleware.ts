import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Allow only admins
      return token?.role === "admin";
    }
  }
});

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
