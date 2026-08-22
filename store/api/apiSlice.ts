import { baseApiQuery } from "@/services/api/baseApiQuery";

import { createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseApiQuery,
  tagTypes: ["User", "Conversation", "Message"],
  endpoints: () => ({}),
});
