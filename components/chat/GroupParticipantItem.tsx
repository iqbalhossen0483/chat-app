import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ConversationParticipant } from "@/types/type";
import {
  LoaderCircle,
  MoreVertical,
  ShieldAlert,
  UserMinus,
} from "lucide-react";
import React, { useState } from "react";

interface GroupParticipantItemProps {
  participant: ConversationParticipant;
  isAdmin: boolean;
  onRemove: (participantId: string) => Promise<void>;
  onMakeAdmin: (participantId: string) => Promise<void>;
  currentUserId: string;
  isRemoving: boolean;
  isPromoting: boolean;
  isCurrentUserAdmin: boolean;
}

export default function GroupParticipantItem({
  participant,
  isAdmin,
  onRemove,
  onMakeAdmin,
  currentUserId,
  isRemoving,
  isPromoting,
  isCurrentUserAdmin,
}: GroupParticipantItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useOutsideClick<HTMLDivElement>(() =>
    setIsMenuOpen(false),
  );

  const handleRemoveMember = async () => {
    await onRemove(participant._id);
    setIsMenuOpen(false);
  };

  const handleMakeAdmin = async () => {
    await onMakeAdmin(participant._id);
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-xl bg-background/50 border border-border/50">
      <div className="flex items-center gap-3">
        <Avatar name={participant.name} size="sm" />
        <div>
          <div className="flex items-center gap-1.5">
            <Typography
              variant="body"
              className="text-xs font-semibold text-foreground"
            >
              {participant.name}
            </Typography>
            {isAdmin && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                Admin
              </span>
            )}
          </div>
          <Typography
            variant="caption"
            className="text-[11px] text-muted-foreground"
          >
            {participant.phone}
          </Typography>
        </div>
      </div>

      <div className="relative" ref={containerRef}>
        {currentUserId !== participant._id && isCurrentUserAdmin && (
          <IconButton
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Member options"
            className="p-1"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground hover:text-foreground" />
          </IconButton>
        )}

        {isMenuOpen && (
          <div className="absolute right-0 mt-1 w-44 rounded-xl bg-surface border border-border shadow-xl p-1.5 z-50 glass-panel animate-in fade-in zoom-in-95 duration-100">
            <div className="space-y-0.5">
              {!isAdmin && (
                <button
                  disabled={isPromoting}
                  onClick={handleMakeAdmin}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer ${isPromoting ? "justify-center" : ""}`}
                >
                  {!isPromoting ? (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-primary" />
                      <Typography
                        variant="caption"
                        className="text-xs font-medium text-foreground"
                      >
                        make admin
                      </Typography>
                    </>
                  ) : (
                    <LoaderCircle className="animate-spin" />
                  )}
                </button>
              )}

              <button
                disabled={isRemoving}
                onClick={handleRemoveMember}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer ${isRemoving ? "justify-center" : ""}`}
              >
                {!isRemoving ? (
                  <>
                    <UserMinus className="w-3.5 h-3.5 text-red-500" />
                    <Typography
                      variant="caption"
                      className="text-xs font-medium text-red-500"
                    >
                      remove
                    </Typography>
                  </>
                ) : (
                  <LoaderCircle className="animate-spin size-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
