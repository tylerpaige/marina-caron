// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const passwordProtection = process.env.PASSWORD_PROTECTION;
  if (!passwordProtection) {
    return NextResponse.next();
  }

  // Parse the privacy configuration from the environment variable
  try {
    const { isPrivate, username, password } = JSON.parse(passwordProtection);
    if (isPrivate) {
      const authHeader = request.headers.get('authorization');

      // Build the expected basic auth string using btoa (available in the Edge runtime)
      const expectedAuth =
        'Basic ' + btoa(`${username}:${password}`);
      if (authHeader !== expectedAuth) {
        return new NextResponse('Authentication required', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Protected Area"',
          },
        });
      }
    }
  } catch (err) {
    console.error('Error parsing privacy config:', err);
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on.
// This example protects all pages except API routes and static assets.
// Do not block API requests or requests to the admin dashboard
// since those might be used to affect the password protection.
export const config = {
  matcher: '/((?!api|admin|_next/static|_next/image|favicon.ico).*)',
};
