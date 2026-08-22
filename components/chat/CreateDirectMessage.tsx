import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Modal from "@/components/ui/Modal";
import { useDebounce } from "@/hooks/useDebouncer";
import { errorHandler } from "@/services/error/errorHandler";
import {
  useLazySearchUsersQuery,
  useStartDirectConversationMutation,
} from "@/store/api/chatApiSlice";
import { User } from "@/types/type";
import { Check, LoaderCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Typography from "../ui/Typography";

export default function CreateDirectMessage({
  isOpen,
  onClose,
  onConversationCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [createDirectMessage, { isLoading }] =
    useStartDirectConversationMutation();
  const [triggerSearch, { data: searchResults = [], isFetching }] =
    useLazySearchUsersQuery();
  const searchValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    triggerSearch(searchValue);
  }, [searchValue, triggerSearch]);

  const toggleUser = (user: User) => {
    setSelectedUser(user);
  };
  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || isLoading) return;
    try {
      const res = await createDirectMessage({
        userId: selectedUser._id,
      }).unwrap();
      onConversationCreated(res._id);
      onClose();
    } catch (err: unknown) {
      errorHandler(err, "Failed to create group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Find new friend">
      <form onSubmit={handleGroupSubmit} className="space-y-4">
        <InputField
          placeholder="Search users by name or phone"
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
            const isSelected = selectedUser?._id === user._id;
            return (
              <div
                key={user._id}
                onClick={() => toggleUser(user)}
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

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={!selectedUser || isLoading}
          isLoading={isLoading}
        >
          {selectedUser
            ? `Connect with ${selectedUser?.name}`
            : "Select a user"}
        </Button>
      </form>
    </Modal>
  );
}
