import {
  AddMemberToAGroupBody,
  AddMemberToGroupResponse,
  AllConversationApiResponse,
  Conversation,
  CreateGroupBody,
  CreateGroupResponse,
  SendMessageBody,
  SendMessageResponse,
  SingleConversationApiResponse,
  UserApiResponse,
} from "@/types/type";
import { apiSlice } from "./apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Users endpoints
    searchUsers: builder.query<UserApiResponse, string>({
      query: (searchTerm) => ({
        url: "/users/search",
        params: searchTerm ? { q: searchTerm } : undefined,
      }),
      providesTags: ["User"],
    }),

    // Conversations endpoints
    getConversations: builder.query<AllConversationApiResponse, void>({
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
    getMessages: builder.query<SingleConversationApiResponse, string>({
      query: (conversationId) => `/conversations/${conversationId}/messages`,
      providesTags: (_result, _error, conversationId) => [
        { type: "Message", id: conversationId },
      ],
    }),

    // Messages endpoints
    sendMessage: builder.mutation<SendMessageResponse, SendMessageBody>({
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
    createGroup: builder.mutation<CreateGroupResponse, CreateGroupBody>({
      query: (body) => ({
        url: "/conversations/group",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),
    addParticipants: builder.mutation<
      AddMemberToGroupResponse,
      AddMemberToAGroupBody
    >({
      query: ({ conversationId, userIds }) => ({
        url: `/conversations/${conversationId}/participants`,
        method: "POST",
        body: { userIds },
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
