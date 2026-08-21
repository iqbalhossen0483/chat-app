import Avatar from "@/components/ui/Avatar";
import Switch from "@/components/ui/Switch";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { LogOut, MoreVertical, Sun, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface SidebarFooterProps {
  currentUser?: { name?: string | null; phone?: string | null };
  onOpenNewChat: () => void;
}

export default function SidebarFooter({
  currentUser,
  onOpenNewChat,
}: SidebarFooterProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const popoverRef = useOutsideClick<HTMLDivElement>(() =>
    setIsPopoverOpen(false),
  );

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <div className="p-4 border-t border-border flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <Avatar name={currentUser?.name || "User"} size="md" />
        <div>
          <h3 className="text-sm font-bold text-foreground">
            {currentUser?.name || "My Account"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {currentUser?.phone || "Online"}
          </p>
        </div>
      </div>

      {/* More Options Button & Popover */}
      <div className="relative" ref={popoverRef}>
        <button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-border/40 transition-colors cursor-pointer"
          title="More Options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isPopoverOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-56 rounded-2xl bg-surface border border-border shadow-xl p-2 z-50 glass-panel animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-1">
              <button
                onClick={() => {
                  setIsPopoverOpen(false);
                  onOpenNewChat();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-primary" />
                <span>Create Group</span>
              </button>

              <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-surface/80">
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-primary" />
                  <span>Theme</span>
                </div>
                <Switch checked={isDarkMode} onChange={handleThemeToggle} />
              </div>

              <div className="my-1 border-t border-border" />

              <button
                onClick={() => {
                  setIsPopoverOpen(false);
                  signOut({ callbackUrl: "/auth" });
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
