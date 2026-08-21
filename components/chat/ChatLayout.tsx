import { useGetConversationsQuery } from "@/store/api/apiSlice";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import ChatArea from "./ChatArea";
import CreateNewGroup from "./CreateNewGroup";
import Sidebar from "./Sidebar";

interface ChatLayoutProps {
  currentUser?: { name?: string | null; phone?: string | null; id?: string };
}

export default function ChatLayout({ currentUser }: ChatLayoutProps) {
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const {
    data: conversations = { data: [] },
    isLoading,
    error,
  } = useGetConversationsQuery();

  const activeConversation = conversations.data.find(
    (c) => c._id === activeConversationId,
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar
        conversations={conversations.data}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onOpenNewChat={() => setIsNewChatModalOpen(true)}
        currentUser={currentUser}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted-foreground animate-pulse">
              Loading conversations...
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-red-500 font-medium">
              Failed to load conversations. Please check your connection.
            </p>
          </div>
        ) : activeConversation ? (
          <ChatArea
            conversation={activeConversation}
            currentUserId={currentUser?.id}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-inner">
              <MessageSquare className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Welcome to VortexChat
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              Select an existing conversation from the sidebar or start a new
              1-to-1 or group chat.
            </p>
          </div>
        )}
      </main>

      <CreateNewGroup
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onConversationCreated={(id) => setActiveConversationId(id)}
      />
    </div>
  );
}
