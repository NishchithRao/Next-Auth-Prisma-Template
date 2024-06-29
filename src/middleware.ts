import { auth } from "../auth";

// This function can be marked `async` if using `await` inside
export const middleware = auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|favicon.ico).*)"],
};
