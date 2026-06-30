import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const authObj = await auth();
    if (!authObj.userId) {
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }

    const client = await clerkClient();
    const user = await client.users.getUser(authObj.userId);
    const email = user.emailAddresses[0]?.emailAddress?.toLowerCase();
    const adminEmailsStr = process.env.ADMIN_EMAIL || "kellymaxstudios@gmail.com";
    const adminEmails = adminEmailsStr.split(",").map((e) => e.trim().toLowerCase());

    if (!email || !adminEmails.includes(email)) {
      // Redirect to home if it's a page request, otherwise return a 403 Forbidden for API requests
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
