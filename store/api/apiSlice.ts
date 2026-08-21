import { Conversation, Message, User } from "@/types/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      // Try to get NextAuth session token
      const session = await getSession();
      if (session?.accessToken) {
        headers.set("authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Conversation", "Message"],
  endpoints: (builder) => ({
    // Auth endpoints
    getMe: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // Users endpoints
    searchUsers: builder.query<User[], string>({
      query: (searchTerm) => ({
        url: "/users/search",
        params: searchTerm ? { q: searchTerm } : undefined,
      }),
      providesTags: ["User"],
    }),

    // Conversations endpoints
    getConversations: builder.query<Conversation[], void>({
      query: () => "/conversations",
      providesTags: ["Conversation"],
    }),
    startDirectConversation: builder.mutation<
      Conversation,
      { recipientId: string }
    >({
      query: (body) => ({
        url: "/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),
    getMessages: builder.query<Message[], string>({
      query: (conversationId) => `/conversations/${conversationId}/messages`,
      providesTags: (_result, _error, conversationId) => [
        { type: "Message", id: conversationId },
      ],
    }),

    // Messages endpoints
    sendMessage: builder.mutation<
      Message,
      { conversationId: string; text: string }
    >({
      query: (body) => ({
        url: "/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { conversationId }) => [
        { type: "Message", id: conversationId },
        "Conversation",
      ],
    }),

    // Group endpoints
    createGroup: builder.mutation<
      Conversation,
      { name: string; participantIds: string[] }
    >({
      query: (body) => ({
        url: "/conversations/group",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),
    addParticipants: builder.mutation<
      Conversation,
      { conversationId: string; participantIds: string[] }
    >({
      query: ({ conversationId, participantIds }) => ({
        url: `/conversations/${conversationId}/participants`,
        method: "POST",
        body: { participantIds },
      }),
      invalidatesTags: ["Conversation"],
    }),
    removeParticipant: builder.mutation<
      Conversation,
      { conversationId: string; userId: string }
    >({
      query: ({ conversationId, userId }) => ({
        url: `/conversations/${conversationId}/participants/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Conversation"],
    }),
    promoteAdmin: builder.mutation<
      Conversation,
      { conversationId: string; userId: string }
    >({
      query: ({ conversationId, userId }) => ({
        url: `/conversations/${conversationId}/admins`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Conversation"],
    }),
    renameGroup: builder.mutation<
      Conversation,
      { conversationId: string; name: string }
    >({
      query: ({ conversationId, name }) => ({
        url: `/conversations/${conversationId}`,
        method: "PATCH",
        body: { name },
      }),
      invalidatesTags: ["Conversation"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery,
  useGetConversationsQuery,
  useStartDirectConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useCreateGroupMutation,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
  usePromoteAdminMutation,
  useRenameGroupMutation,
} = apiSlice;
