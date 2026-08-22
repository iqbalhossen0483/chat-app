import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

export const baseApiQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers) => {
    // Try to get NextAuth session token
    const session = await getSession();
    if (session?.accessToken) {
      headers.set("authorization", `Bearer ${session.accessToken}`);
    }
    return headers;
  },
});
