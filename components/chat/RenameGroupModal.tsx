import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Modal from "@/components/ui/Modal";
import Typography from "@/components/ui/Typography";
import React, { useState } from "react";

interface RenameGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string;
  onRename: (newName: string) => Promise<void>;
  isLoading?: boolean;
}

export default function RenameGroupModal({
  isOpen,
  onClose,
  currentName = "",
  onRename,
  isLoading = false,
}: RenameGroupModalProps) {
  const [name, setName] = useState(currentName);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onRename(name.trim());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rename Group">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Typography
            variant="body"
            className="text-xs text-muted-foreground mb-2"
          >
            Enter a new name for this group chat.
          </Typography>
          <InputField
            type="text"
            placeholder="Group name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            isLoading={isLoading}
            type="submit"
            variant="primary"
            disabled={!name.trim() || isLoading}
            className="px-4 py-2 text-xs"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
