import Avatar from "@/components/ui/Avatar";
import Modal from "@/components/ui/Modal";
import Typography from "@/components/ui/Typography";
import { Conversation } from "@/types/type";
import React from "react";

interface SeeAllMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
}

export default function SeeAllMembersModal({
  isOpen,
  onClose,
  conversation,
}: SeeAllMembersModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Group Members">
      <div className="space-y-3">
        {conversation.participants && conversation.participants.length > 0 ? (
          conversation.participants.map((participant, index) => {
            const participantName =
              typeof participant === "object" &&
              participant !== null &&
              "name" in participant
                ? (participant as any).name
                : "Member";
            const participantPhone =
              typeof participant === "object" &&
              participant !== null &&
              "phone" in participant
                ? (participant as any).phone
                : "";
            const isAdmin = conversation.admins?.includes(
              typeof participant === "object" &&
                participant !== null &&
                "_id" in participant
                ? (participant as any)._id
                : participant
            );

            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-xl bg-background/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={participantName} size="sm" />
                  <div>
                    <Typography
                      variant="body"
                      className="text-xs font-semibold text-foreground"
                    >
                      {participantName}
                    </Typography>
                    {participantPhone && (
                      <Typography
                        variant="caption"
                        className="text-[11px] text-muted-foreground"
                      >
                        {participantPhone}
                      </Typography>
                    )}
                  </div>
                </div>
                {isAdmin && (
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    Admin
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <Typography
            variant="caption"
            className="text-xs text-muted-foreground text-center py-4"
          >
            No participants found.
          </Typography>
        )}
      </div>
    </Modal>
  );
}
