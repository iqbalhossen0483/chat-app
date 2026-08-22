import Typography from "@/components/ui/Typography";
import { Message } from "@/types/type";
import { Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

interface ChatMessagesListProps {
  messages: { messages: Message[] };
  isLoading: boolean;
  error: unknown;
  currentUserId?: string;
}

export default function ChatMessagesList({
  messages,
  isLoading,
  error,
  currentUserId,
}: ChatMessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 80;
    setIsUserScrolledUp(!isAtBottom);
  };

  useEffect(() => {
    if (!isUserScrolledUp) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isUserScrolledUp]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-6 space-y-3"
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Typography
            variant="caption"
            className="text-xs text-muted-foreground animate-pulse"
          >
            Loading messages...
          </Typography>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <Typography
            variant="caption"
            className="text-xs text-red-500 font-medium"
          >
            Failed to load messages. Please try again.
          </Typography>
        </div>
      ) : messages.messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
            <Users className="w-8 h-8" />
          </div>
          <Typography
            variant="h4"
            className="text-sm font-semibold text-foreground mb-1"
          >
            No messages yet
          </Typography>
          <Typography
            variant="caption"
            className="text-xs text-muted-foreground max-w-xs"
          >
            Send a message below to start the conversation!
          </Typography>
        </div>
      ) : (
        messages.messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            currentUserId={currentUserId as string}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
