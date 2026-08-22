import Avatar from "@/components/ui/Avatar";
import Typography from "@/components/ui/Typography";
import { Conversation } from "@/types/type";
import { Phone } from "lucide-react";
import React from "react";

interface SingleChatHeaderProps {
  conversation: Conversation;
}

export default function SingleChatHeader({
  conversation,
}: SingleChatHeaderProps) {
  const displayName = conversation.participant?.name || "User";
  const displayPhone = conversation.participant?.phone;

  return (
    <div className="px-6 py-4 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between z-10">
      <div className="flex items-center gap-3.5">
        <Avatar name={displayName} size="md" />
        <div>
          <Typography variant="h4" className="text-sm font-bold text-foreground">
            {displayName}
          </Typography>
          {displayPhone && (
            <Typography
              variant="caption"
              className="text-xs text-muted-foreground flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" />
              {displayPhone}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
