import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Typography from "@/components/ui/Typography";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

interface AddParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (phoneOrId: string) => void;
}

export default function AddParticipantModal({
  isOpen,
  onClose,
  onAdd,
}: AddParticipantModalProps) {
  const [identifier, setIdentifier] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    onAdd(identifier.trim());
    setIdentifier("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Participant">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Typography variant="body" className="text-xs text-muted-foreground mb-2">
            Enter the user ID or phone number of the participant you wish to add.
          </Typography>
          <InputField
            type="text"
            placeholder="User ID or Phone number..."
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="px-4 py-2 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!identifier.trim()}
            className="px-4 py-2 text-xs"
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
}
