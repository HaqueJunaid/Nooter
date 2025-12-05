import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"
import * as schema from '@/db/user-schema'
import { nextCookies } from "better-auth/next-js";
import { Resend } from 'resend';
import EmailVerification from "@/components/Emails/verifyEmail";

const resend = new Resend(process.env.RESENT_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: 'Hello World',
        react: EmailVerification({url})
      });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }),
  plugins: [nextCookies()]
});