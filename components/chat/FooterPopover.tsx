import { LogOut, Sun, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Switch from "../ui/Switch";

type Props = {
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenNewChat: () => void;
};

const FooterPopover = ({ setIsPopoverOpen, onOpenNewChat }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
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
  );
};

export default FooterPopover;
