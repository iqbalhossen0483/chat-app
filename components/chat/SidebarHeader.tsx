import InputField from "@/components/ui/InputField";
import { Search, UserSearch } from "lucide-react";
import React from "react";
import IconButton from "../ui/IconButton";

interface SidebarHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewDirectMessage: () => void;
}

export default function SidebarHeader({
  searchQuery,
  onSearchChange,
  onOpenNewDirectMessage,
}: SidebarHeaderProps) {
  return (
    <div className="p-3 border-b border-border flex items-center gap-1">
      <InputField
        placeholder="Search conversation"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
        className="py-2 text-xs"
      />

      <IconButton onClick={onOpenNewDirectMessage}>
        <UserSearch className="size-5" />
      </IconButton>
    </div>
  );
}
