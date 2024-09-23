import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isSellerDashboard = createRouteMatcher(["/dashboard(.*)"]);
const isUserDashboard = createRouteMatcher(["/my-orders(.*)"]);
const isAdminDashboard = createRouteMatcher(["/admin-panel(.*)"]);

export default clerkMiddleware((auth, req) => {
  const { sessionClaims }: any = auth();
  if (
    isSellerDashboard(req) &&
    sessionClaims?.publicMetadata?.role !== "seller"
  ) {
    auth().protect();
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isUserDashboard(req) && sessionClaims?.publicMetadata?.role !== "user") {
    auth().protect();
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    isAdminDashboard(req) &&
    sessionClaims?.publicMetadata?.role !== "admin"
  ) {
    auth().protect();
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
