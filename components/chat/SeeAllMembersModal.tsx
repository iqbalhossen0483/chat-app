import Modal from "@/components/ui/Modal";
import Typography from "@/components/ui/Typography";
import { errorHandler } from "@/services/error/errorHandler";
import {
  usePromoteAdminMutation,
  useRemoveParticipantMutation,
} from "@/store/api/chatApiSlice";
import { Conversation } from "@/types/type";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-toastify";
import GroupActionsMenu from "./GroupActionsMenu";
import GroupParticipantItem from "./GroupParticipantItem";

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
  const session = useSession();
  const currentUser = session.data?.user;
  const isCurrentUserAdmin = !!conversation.admins?.includes(
    currentUser?.id || "",
  );
  const [removeParticipant, { isLoading: isRemoving }] =
    useRemoveParticipantMutation();
  const [promoteAdmin, { isLoading: isPromoting }] = usePromoteAdminMutation();

  const handleAddParticipant = () => {
    alert("Add participant action clicked");
  };

  const handleRenameGroup = () => {
    alert("Rename group action clicked");
  };

  const handleRemoveMember = async (participantId: string) => {
    try {
      await removeParticipant({
        conversationId: conversation._id,
        userId: participantId,
      });
      toast.success("Participant removed successfully");
    } catch (error) {
      errorHandler(error, "Failed to remove participant");
    }
  };

  const handleMakeAdmin = async (participantId: string) => {
    try {
      await promoteAdmin({
        conversationId: conversation._id,
        userId: participantId,
      });
      toast.success("Admin promoted successfully");
    } catch (err: unknown) {
      errorHandler(err, "Failed to promote admin");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-2">
        {/* Top Group Actions Menu Header */}
        <div className="flex items-center justify-between pb-2">
          <Typography
            variant="body"
            className="text-sm text-muted-foreground font-medium"
          >
            Member List
          </Typography>
          <GroupActionsMenu
            onAddParticipant={handleAddParticipant}
            onRenameGroup={handleRenameGroup}
          />
        </div>

        {/* Members List */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {conversation.participants && conversation.participants.length > 0 ? (
            conversation.participants.map((participant) => {
              const isAdmin = !!conversation.admins?.includes(participant._id);

              return (
                <GroupParticipantItem
                  key={participant._id}
                  participant={participant}
                  isAdmin={isAdmin}
                  onRemove={handleRemoveMember}
                  onMakeAdmin={handleMakeAdmin}
                  currentUserId={currentUser?.id || ""}
                  isRemoving={isRemoving}
                  isPromoting={isPromoting}
                  isCurrentUserAdmin={isCurrentUserAdmin}
                />
              );
            })
          ) : (
            <Typography
              variant="caption"
              className="text-xs text-muted-foreground text-center py-4 block"
            >
              No participants found.
            </Typography>
          )}
        </div>
      </div>
    </Modal>
  );
}
