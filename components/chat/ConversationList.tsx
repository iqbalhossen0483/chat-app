import { Conversation } from "@/types/type";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  searchQuery,
}: ConversationListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
      {conversations.length === 0 ? (
        <div className="text-center py-12 px-4">
          <p className="text-xs text-muted-foreground">
            {searchQuery
              ? "No conversations found"
              : "No chats yet. Start a new conversation!"}
          </p>
        </div>
      ) : (
        conversations.map((conv) => (
          <ConversationItem
            key={conv._id}
            conversation={conv}
            isActive={conv._id === activeConversationId}
            onClick={() => onSelectConversation(conv._id)}
          />
        ))
      )}
    </div>
  );
}
