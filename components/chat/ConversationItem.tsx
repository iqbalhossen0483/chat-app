import Avatar from "@/components/ui/Avatar";
import { Conversation } from "@/store/api/apiSlice";
import { Users } from "lucide-react";
import React from "react";

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId?: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  currentUserId: _currentUserId,
  isActive,
  onClick,
}: ConversationItemProps) {
  const isGroup = conversation.type === "group";
  const displayName = isGroup
    ? conversation.name || "Group Chat"
    : conversation.participant?.name || "User";

  const displayPhone = !isGroup
    ? conversation.participant?.phone
    : `${conversation.participants?.length || 0} members`;

  const lastMessageText = conversation.lastMessage?.text || "No messages yet";
  const lastMessageTime = conversation.lastMessage?.createdAt
    ? new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : conversation.updatedAt
      ? new Date(conversation.updatedAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer transition-all ${
        isActive
          ? "bg-primary/15 border border-primary/30 shadow-sm"
          : "hover:bg-surface/80 border border-transparent"
      }`}
    >
      <div className="relative shrink-0">
        {isGroup ? (
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            <Users className="w-6 h-6" />
          </div>
        ) : (
          <Avatar name={displayName} size="lg" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {displayName}
          </h4>
          <span className="text-[11px] text-muted-foreground shrink-0">
            {lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground truncate pr-2">
            {lastMessageText}
          </p>
          {isGroup && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">
              Group
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
