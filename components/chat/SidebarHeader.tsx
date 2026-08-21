import InputField from "@/components/ui/InputField";
import { Search } from "lucide-react";
import React from "react";

interface SidebarHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SidebarHeader({
  searchQuery,
  onSearchChange,
}: SidebarHeaderProps) {
  return (
    <div className="p-3 border-b border-border">
      <InputField
        placeholder="Search friend"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
        className="py-2 text-xs"
      />
    </div>
  );
}
