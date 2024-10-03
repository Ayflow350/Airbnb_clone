import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Debugging credentials
        console.log("Authorization started...");
        console.log("Credentials provided:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Invalid credentials provided.");
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("User fetched from database:", user);

        if (!user || !user?.hashedPassword) {
          console.log("Invalid user or missing hashed password.");
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        console.log("Password comparison result:", isCorrectPassword);

        if (!isCorrectPassword) {
          console.log("Incorrect password.");
          throw new Error("Invalid credentials");
        }

        console.log("Authorization successful. User:", user);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },

  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV == "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
