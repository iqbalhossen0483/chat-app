import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Typography from "@/components/ui/Typography";
import React from "react";

interface LeaveGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  groupName?: string;
  isLoading?: boolean;
}

export default function LeaveGroupModal({
  isOpen,
  onClose,
  onConfirm,
  groupName = "this group",
  isLoading = false,
}: LeaveGroupModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Leave Group">
      <div className="space-y-4">
        <Typography variant="body" className="text-xs text-muted-foreground">
          Are you sure you want to leave{" "}
          <span className="font-semibold text-foreground">{groupName}</span>?
          You will no longer receive messages from this group.
        </Typography>
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
            type="button"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-xs bg-red-500 hover:bg-red-600 text-white"
          >
            Leave Group
          </Button>
        </div>
      </div>
    </Modal>
  );
}
