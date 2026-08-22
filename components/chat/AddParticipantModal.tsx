import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React, { useState } from "react";
import SelectParticipants from "./SelectParticipants";

interface AddParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (userIds: string[]) => Promise<void>;
  isLoading?: boolean;
}

export default function AddParticipantModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}: AddParticipantModalProps) {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!selectedUserIds.length) return;
    await onAdd(selectedUserIds);
    setSelectedUserIds([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Participant">
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectParticipants
          selectedUserIds={selectedUserIds}
          setSelectedUserIds={setSelectedUserIds}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={selectedUserIds.length === 0 || isLoading}
          isLoading={isLoading}
        >
          Add Participant
        </Button>
      </form>
    </Modal>
  );
}
