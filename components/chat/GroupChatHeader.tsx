import Typography from "@/components/ui/Typography";
import { Conversation } from "@/types/type";
import { ShieldCheck, Users } from "lucide-react";
import React from "react";

interface GroupChatHeaderProps {
  conversation: Conversation;
}

export default function GroupChatHeader({
  conversation,
}: GroupChatHeaderProps) {
  const displayName = conversation.name || "Group Chat";
  const memberCount = conversation.participants?.length || 0;

  return (
    <div className="px-6 py-4 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between z-10">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <Typography variant="h4" className="text-sm font-bold text-foreground">
            {displayName}
          </Typography>
          <Typography
            variant="caption"
            className="text-xs text-muted-foreground flex items-center gap-1.5"
          >
            {memberCount} members
          </Typography>
        </div>
      </div>
      {conversation.admins && (
        <div className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <Typography
            variant="caption"
            className="text-xs text-primary font-medium"
          >
            {conversation.admins.length} Admins
          </Typography>
        </div>
      )}
    </div>
  );
}
