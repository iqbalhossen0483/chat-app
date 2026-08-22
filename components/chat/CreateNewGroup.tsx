import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Modal from "@/components/ui/Modal";
import { useDebounce } from "@/hooks/useDebouncer";
import { errorHandler } from "@/services/error/errorHandler";
import {
  useCreateGroupMutation,
  useLazySearchUsersQuery,
} from "@/store/api/chatApiSlice";
import { Check, LoaderCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Typography from "../ui/Typography";

export default function CreateNewGroup({
  isOpen,
  onClose,
  onConversationCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [createGroup, { isLoading: isCreatingGroup }] =
    useCreateGroupMutation();
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
  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim() || selectedUserIds.length === 0 || isCreatingGroup)
      return;
    try {
      const res = await createGroup({
        name: groupName.trim(),
        participantIds: selectedUserIds,
      }).unwrap();
      onConversationCreated(res._id);
      onClose();
    } catch (err: unknown) {
      errorHandler(err, "Failed to create group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Group">
      <form onSubmit={handleGroupSubmit} className="space-y-4">
        <InputField
          label="Group Name"
          placeholder="e.g. Computer Pioneers"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Select Participants ({selectedUserIds.length} selected)
          </label>
          <InputField
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            rightIcon={
              isFetching ? (
                <LoaderCircle className="w-4 h-4 animate-spin" />
              ) : null
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
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={
            !groupName.trim() || selectedUserIds.length === 0 || isCreatingGroup
          }
          isLoading={isCreatingGroup}
        >
          Create Group
        </Button>
      </form>
    </Modal>
  );
}
