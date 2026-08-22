import Avatar from "@/components/ui/Avatar";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import IconButton from "../ui/IconButton";
import Typography from "../ui/Typography";
import FooterPopover from "./FooterPopover";

interface SidebarFooterProps {
  currentUser?: { name?: string | null; phone?: string | null };
  onOpenNewChat: () => void;
}

export default function SidebarFooter({
  currentUser,
  onOpenNewChat,
}: SidebarFooterProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useOutsideClick<HTMLDivElement>(() =>
    setIsPopoverOpen(false),
  );

  return (
    <div className="p-4 border-t border-border flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <Avatar name={currentUser?.name || "User"} size="md" />
        <div>
          <Typography variant="body" className="text-sm font-bold">
            {currentUser?.name || "My Account"}
          </Typography>
          <Typography className="text-sm">
            {currentUser?.phone || "Online"}
          </Typography>
        </div>
      </div>

      {/* More Options Button & Popover */}
      <div className="relative" ref={popoverRef}>
        <IconButton
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          title="More Options"
        >
          <MoreVertical className="size-5" />
        </IconButton>

        {isPopoverOpen && (
          <FooterPopover
            setIsPopoverOpen={setIsPopoverOpen}
            onOpenNewChat={onOpenNewChat}
          />
        )}
      </div>
    </div>
  );
}
