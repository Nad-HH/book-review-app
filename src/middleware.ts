import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";
  const isReviewPage = req.nextUrl.pathname.startsWith("/reviews");

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/reviews", req.url));
  }
  if (!isAuth && isReviewPage) {
    return NextResponse.redirect(
      new URL(`/login?callbackURL=${req.nextUrl.pathname}`, req.url)
    );
  }
}, {
    callbacks: {
        authorized: () => true,
    },
});

export const config = {
  matcher: ["/login", "/signup","/reviews/:path*"],
};