import { LogOut, Users } from "lucide-react";
import React from "react";
import Typography from "../ui/Typography";

type Props = {
  ref: React.RefObject<HTMLDivElement | null>;
  onSeeAllMembers: () => void;
  onLeaveGroup: () => void;
  memberCount: number;
};

const GroupSettingMenusPopover = ({
  onSeeAllMembers,
  onLeaveGroup,
  memberCount,
  ref,
}: Props) => {
  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-surface border border-border shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="space-y-1">
        <button
          onClick={onSeeAllMembers}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <Users className="w-4 h-4 text-primary" />
          <Typography
            variant="caption"
            className="text-xs font-medium text-foreground"
          >
            See all members
          </Typography>
        </button>

        <button
          onClick={onLeaveGroup}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <Typography
            variant="caption"
            className="text-xs font-medium text-red-500"
          >
            Leave group
          </Typography>
        </button>

        <div className="my-1 border-t border-border" />

        <div className="px-3 py-2 text-center">
          <Typography
            variant="caption"
            className="text-[11px] text-muted-foreground font-medium"
          >
            total {memberCount} members
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default GroupSettingMenusPopover;
