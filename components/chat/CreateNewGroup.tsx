import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Modal from "@/components/ui/Modal";
import { errorHandler } from "@/services/error/errorHandler";
import { useCreateGroupMutation } from "@/store/api/chatApiSlice";
import React, { useState } from "react";
import SelectParticipants from "./SelectParticipants";

export default function CreateNewGroup({
  isOpen,
  onClose,
  onConversationCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated: (id: string) => void;
}) {
  const [groupName, setGroupName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [createGroup, { isLoading: isCreatingGroup }] =
    useCreateGroupMutation();

  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || selectedUserIds.length === 0 || isCreatingGroup)
      return;
    try {
      const res = await createGroup({
        name: groupName.trim(),
        participantIds: selectedUserIds,
      }).unwrap();
      onConversationCreated(res._id);
      onClose();
    } catch (err: unknown) {
      errorHandler(err, "Failed to create group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Group">
      <form onSubmit={handleGroupSubmit} className="space-y-4">
        <InputField
          label="Group Name"
          placeholder="e.g. Computer Pioneers"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <SelectParticipants
          selectedUserIds={selectedUserIds}
          setSelectedUserIds={setSelectedUserIds}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={
            !groupName.trim() || selectedUserIds.length === 0 || isCreatingGroup
          }
          isLoading={isCreatingGroup}
        >
          Create Group
        </Button>
      </form>
    </Modal>
  );
}
