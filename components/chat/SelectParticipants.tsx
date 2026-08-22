import { useDebounce } from "@/hooks/useDebouncer";
import { useLazySearchUsersQuery } from "@/store/api/chatApiSlice";
import { Check, LoaderCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import Typography from "../ui/Typography";

type Props = {
  selectedUserIds: string[];
  setSelectedUserIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelectParticipants = ({ selectedUserIds, setSelectedUserIds }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerSearch, { data: searchResults = [], isFetching }] =
    useLazySearchUsersQuery();
  const searchValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    triggerSearch(searchValue);
  }, [searchValue, triggerSearch]);

  const toggleParticipant = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">
        Select Participants ({selectedUserIds.length} selected)
      </label>
      <InputField
        placeholder="Search users by name or phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
        rightIcon={
          isFetching ? <LoaderCircle className="w-4 h-4 animate-spin" /> : null
        }
      />
      <div className="max-h-48 overflow-y-auto space-y-1.5 mt-2">
        {searchResults.map((user) => {
          const isSelected = selectedUserIds.includes(user._id);
          return (
            <div
              key={user._id}
              onClick={() => toggleParticipant(user._id)}
              className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer ${isSelected ? "bg-primary/15 border-primary/40" : "bg-background border-border"}`}
            >
              <div>
                <Typography className="text-xs font-semibold text-foreground">
                  {user.name}
                </Typography>
                <Typography className="text-xs text-muted-foreground">
                  {user.phone}
                </Typography>
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? "bg-primary border-primary text-white" : "border-border"}`}
              >
                {isSelected && <Check className="w-3 h-3" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectParticipants;
