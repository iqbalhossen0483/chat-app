import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      phone?: string;
    } & DefaultSession["user"];
  }
}

interface CustomUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone Number",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "+15551234567",
        },
        name: { label: "Name", type: "text", placeholder: "Full Name" },
      },
      async authorize(credentials) {
        if (!credentials?.phone) {
          throw new Error("Phone number is required");
        }

        try {
          const baseUrl =
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            "https://frontend-task-chatapp.onrender.com/api";
          const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: credentials.phone,
              name: credentials.name || "User",
            }),
          });

          const data = (await res.json()) as {
            token?: string;
            user?: { _id: string; name: string; phone: string };
          };

          if (!res.ok) {
            throw new Error("Authentication failed");
          }

          if (data.token && data.user) {
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.phone, // Using email field in NextAuth to hold phone for session convenience
              token: data.token,
            };
          }

          return null;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || "Authentication service error");
          }
          throw new Error("Authentication service error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as CustomUser;
        token.accessToken = customUser.token;
        token.id = customUser.id;
        token.phone = customUser.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        if (session.user) {
          session.user.id = token.id as string;
          session.user.phone = token.phone as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
