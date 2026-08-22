import IconButton from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { errorHandler } from "@/services/error/errorHandler";
import { useRemoveParticipantMutation } from "@/store/api/chatApiSlice";
import { Conversation } from "@/types/type";
import { Settings, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import GroupSettingMenusPopover from "./GroupSettingMenusPopover";
import LeaveGroupModal from "./LeaveGroupModal";
import SeeAllMembersModal from "./SeeAllMembersModal";

interface GroupChatHeaderProps {
  conversation: Conversation;
}

export default function GroupChatHeader({
  conversation,
}: GroupChatHeaderProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const popoverRef = useOutsideClick<HTMLDivElement>(() =>
    setIsPopoverOpen(false),
  );
  const [leaveGroup, { isLoading: isLeaving }] = useRemoveParticipantMutation();
  const session = useSession();
  const currentUser = session.data?.user;

  const displayName = conversation.name || "Group Chat";
  const memberCount = conversation.participants?.length || 0;

  const handleSeeAllMembers = () => {
    setIsPopoverOpen(false);
    setIsMembersModalOpen(true);
  };

  const handleLeaveGroup = () => {
    setIsPopoverOpen(false);
    setIsLeaveModalOpen(true);
  };

  const handleConfirmLeave = async () => {
    try {
      if (!currentUser?.id) return;
      await leaveGroup({
        conversationId: conversation._id,
        userId: currentUser?.id,
      });
    } catch (err) {
      errorHandler(err, "Failed to leave group");
    }
  };

  return (
    <div className="px-6 py-4 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between z-10 relative">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <Typography
            variant="h4"
            className="text-sm font-bold text-foreground"
          >
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

      <div className="relative">
        <IconButton
          onClick={() => setIsPopoverOpen((prev) => !prev)}
          aria-label="Group settings"
        >
          <Settings className="w-5 h-5" />
        </IconButton>

        {isPopoverOpen && (
          <GroupSettingMenusPopover
            ref={popoverRef}
            memberCount={memberCount}
            onLeaveGroup={handleLeaveGroup}
            onSeeAllMembers={handleSeeAllMembers}
          />
        )}
      </div>

      <SeeAllMembersModal
        isOpen={isMembersModalOpen}
        onClose={() => setIsMembersModalOpen(false)}
        conversation={conversation}
      />

      <LeaveGroupModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleConfirmLeave}
        groupName={displayName}
        isLoading={isLeaving}
      />
    </div>
  );
}
