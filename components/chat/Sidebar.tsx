import { Conversation } from "@/types/type";
import { useState } from "react";
import ConversationList from "./ConversationList";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onOpenNewGroup: () => void;
  onOpenNewDirectMessage: () => void;
  currentUser?: { name?: string | null; phone?: string | null };
}

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onOpenNewGroup,
  onOpenNewDirectMessage,
  currentUser,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    const name =
      conv.type === "group"
        ? conv.name || ""
        : conv.participant?.name || conv.participant?.phone || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <aside className="w-full md:w-80 lg:w-96 border-r border-border bg-surface/50 flex flex-col h-full shrink-0 relative">
      {/* Header */}
      <SidebarHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNewDirectMessage={onOpenNewDirectMessage}
      />

      {/* Conversation List */}
      <ConversationList
        conversations={filteredConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={onSelectConversation}
        searchQuery={searchQuery}
      />

      {/* footer */}
      <SidebarFooter currentUser={currentUser} onOpenNewChat={onOpenNewGroup} />
    </aside>
  );
}
