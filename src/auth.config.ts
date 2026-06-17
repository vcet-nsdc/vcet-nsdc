import type { NextAuthConfig } from 'next-auth';
import type { Role } from '@/config/roles';

/**
 * Edge-compatible Auth.js configuration.
 *
 * This file MUST NOT import Mongoose, bcrypt, or any Node-only module — it is
 * loaded by the middleware which runs on the Edge runtime. The Credentials
 * provider (which needs the DB) is added in `auth.ts` for the Node runtime.
 */
export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  providers: [],
  callbacks: {
    /** Coarse route gate used by middleware. Redirects unauthenticated users. */
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/admin')) {
        if (pathname === '/admin/login') return true;
        return !!auth?.user;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
