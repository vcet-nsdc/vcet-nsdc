import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import authConfig from '@/auth.config';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword } from '@/lib/password';
import { isLockedOut, recordFailedAttempt, clearAttempts } from '@/lib/login-attempts';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        await connectToDatabase();

        if (await isLockedOut(email)) {
          throw new Error('Account temporarily locked due to too many attempts. Try again later.');
        }

        const user = await User.findOne({ email: email.toLowerCase().trim(), isActive: true });
        if (!user) {
          await recordFailedAttempt(email);
          return null;
        }

        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) {
          await recordFailedAttempt(email);
          return null;
        }

        await clearAttempts(email);
        user.lastLoginAt = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
