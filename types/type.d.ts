export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: string;
}

export interface ConversationParticipant {
  _id: string;
  name: string;
  phone: string;
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  name?: string;
  createdBy?: string;
  admins?: string[];
  participants?: ConversationParticipant[];
  participant?: ConversationParticipant; // For direct conversations
  lastMessage?: Message;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiErrorResponse {
  status: number;
  data: {
    error: {
      message: string;
      code: string;
      details: {
        path: string;
        message: string;
      }[];
    };
  };
}

export interface SingleConversationApiResponse {
  messages: Message[];
  hasMore: boolean;
}

export type UserApiResponse = User[];

export interface AllConversationApiResponse {
  data: Conversation[];
}

export type SendMessageResponse = Message;
export interface SendMessageBody {
  conversationId: string;
  text: string;
}

export type CreateGroupResponse = Conversation;
export interface CreateGroupBody {
  name: string;
  participantIds: string[];
}

export type AddMemberToAGroupBody = {
  conversationId: string;
  userIds: string[];
};

export type AddMemberToGroupResponse = Conversation;
