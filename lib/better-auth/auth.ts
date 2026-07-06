import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

export type AuthSession = {
  user?: { id: string; name?: string; email?: string } | null;
};

export type AuthClient = {
  api: {
    getSession: (opts?: { headers?: HeadersInit }) => Promise<AuthSession | null>;
    signUpEmail?: (params: { body: { email: string; password: string; name: string } }) => Promise<unknown>;
    signInEmail?: (params: { body: { email: string; password: string } }) => Promise<unknown>;
    signOut: (opts?: { headers?: HeadersInit }) => Promise<void>;
    // add other methods from `better-auth` as needed
  };
};

let authInstance: AuthClient | null = null;

export const getAuth = async (): Promise<AuthClient> => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db as unknown;

  if (!db) throw new Error("MongoDB connection not found");

  const auth = betterAuth({
    database: mongodbAdapter(db as never),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  }) as unknown as AuthClient;

  authInstance = auth;
  return authInstance;
};

export const auth = getAuth() as Promise<AuthClient>;