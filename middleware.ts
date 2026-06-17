import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

// Edge-safe middleware: uses only the edge-compatible config (no DB/bcrypt).
// The `authorized` callback in authConfig redirects unauthenticated users
// hitting /admin/** to the sign-in page. API routes enforce fine-grained
// permissions themselves via requirePermission().
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ['/admin/:path*'],
};
