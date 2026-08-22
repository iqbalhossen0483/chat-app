import IconButton from "@/components/ui/IconButton";
import Typography from "@/components/ui/Typography";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Edit, Plus, Settings } from "lucide-react";
import React, { useState } from "react";

interface GroupActionsMenuProps {
  onAddParticipant: () => void;
  onRenameGroup: () => void;
}

export default function GroupActionsMenu({
  onAddParticipant,
  onRenameGroup,
}: GroupActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative" ref={containerRef}>
      <IconButton
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Group action menu"
      >
        <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground" />
      </IconButton>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-surface border border-border shadow-xl p-2 z-50 glass-panel animate-in fade-in zoom-in-95 duration-150">
          <div className="space-y-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onAddParticipant();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-primary" />
              <Typography
                variant="caption"
                className="text-xs font-medium text-foreground"
              >
                Add participant
              </Typography>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onRenameGroup();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <Edit className="w-4 h-4 text-primary" />
              <Typography
                variant="caption"
                className="text-xs font-medium text-foreground"
              >
                Rename group
              </Typography>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
