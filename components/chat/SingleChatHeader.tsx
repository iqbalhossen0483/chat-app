import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { Conversation } from "@/types/type";
import { ArrowLeft, Phone } from "lucide-react";
import React from "react";

interface SingleChatHeaderProps {
  conversation: Conversation;
  onBack?: () => void;
}

export default function SingleChatHeader({
  conversation,
  onBack,
}: SingleChatHeaderProps) {
  const displayName = conversation.participant?.name || "User";
  const displayPhone = conversation.participant?.phone;

  return (
    <div className="px-4 md:px-6 py-3.5 md:py-4 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between z-10">
      <div className="flex items-center gap-2.5 md:gap-3.5">
        {onBack && (
          <IconButton
            onClick={onBack}
            className="md:hidden p-1.5 -ml-1 text-muted-foreground hover:text-foreground"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="w-5 h-5" />
          </IconButton>
        )}
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

