import { Conversation, Message, User } from "@/types/type";
import { apiSlice } from "./apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Users endpoints
    searchUsers: builder.query<User[], string>({
      query: (searchTerm) => ({
        url: "/users/search",
        params: searchTerm ? { q: searchTerm } : undefined,
      }),
      providesTags: ["User"],
    }),

    // Conversations endpoints
    getConversations: builder.query<{ data: Conversation[] }, void>({
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
    getMessages: builder.query<{ messages: Message[] }, string>({
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
} = chatApiSlice;
