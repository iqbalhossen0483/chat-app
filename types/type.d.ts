export interface User {
  _id: string;
  name: string;
  phone: string;
  createdAt?: string;
}

export interface ConversationParticipant {
  _id: string;
  name: string;
  phone: string;
}

export interface LastMessage {
  _id?: string;
  conversation?: string;
  sender?: string;
  text: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  name?: string;
  createdBy?: string;
  admins?: string[];
  participants?: ConversationParticipant[];
  participant?: ConversationParticipant; // For direct conversations
  lastMessage?: LastMessage;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  conversation: string;
  sender: string;
  text: string;
  createdAt: string;
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
