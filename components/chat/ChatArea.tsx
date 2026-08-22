import { useGetMessagesQuery } from "@/store/api/chatApiSlice";
import { Conversation } from "@/types/type";
import React from "react";
import ChatInputForm from "./ChatInputForm";
import ChatMessagesList from "./ChatMessagesList";
import GroupChatHeader from "./GroupChatHeader";
import SingleChatHeader from "./SingleChatHeader";

interface ChatAreaProps {
  conversation: Conversation;
  currentUserId?: string;
}

export default function ChatArea({
  conversation,
  currentUserId,
}: ChatAreaProps) {
  const {
    data: messages = { messages: [] },
    isLoading,
    error,
  } = useGetMessagesQuery(conversation._id);

  const isGroup = conversation.type === "group";

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      {isGroup ? (
        <GroupChatHeader conversation={conversation} />
      ) : (
        <SingleChatHeader conversation={conversation} />
      )}

      {/* Messages List Area */}
      <ChatMessagesList
        messages={messages}
        isLoading={isLoading}
        error={error}
        currentUserId={currentUserId}
      />

      {/* Message Input Form */}
      <ChatInputForm conversationId={conversation._id} />
    </div>
  );
}
