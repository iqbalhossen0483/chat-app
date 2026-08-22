import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { errorHandler } from "@/services/error/errorHandler";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/store/api/chatApiSlice";
import { Conversation } from "@/types/type";
import { Phone, Send, ShieldCheck, Users } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

interface ChatAreaProps {
  conversation: Conversation;
  currentUserId?: string;
}
type DraftMessage = { text: string; status: string } | null;

export default function ChatArea({
  conversation,
  currentUserId,
}: ChatAreaProps) {
  const [draftMessage, setDraftMessage] = useState<DraftMessage>(null);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);

  const {
    data: messages = { messages: [] },
    isLoading,
    error,
  } = useGetMessagesQuery(conversation._id);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const isGroup = conversation.type === "group";
  const displayName = isGroup
    ? conversation.name || "Group Chat"
    : conversation.participant?.name || "User";
  const displayPhone = !isGroup
    ? conversation.participant?.phone
    : `${conversation.participants?.length || 0} members`;

  // Handle scroll detection to respect "do not force scroll if user scrolled up"
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

  const handleSend = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;

    try {
      setDraftMessage({ text, status: "pending" });
      await sendMessage({
        conversationId: conversation._id,
        text: text.trim(),
      }).unwrap();
      setText("");
      setIsUserScrolledUp(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      errorHandler(err, "Failed to send message");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3.5">
          {isGroup ? (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              <Users className="w-5 h-5" />
            </div>
          ) : (
            <Avatar name={displayName} size="md" />
          )}
          <div>
            <h3 className="text-sm font-bold text-foreground">{displayName}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              {!isGroup && <Phone className="w-3 h-3" />}
              {displayPhone}
            </p>
          </div>
        </div>
        {isGroup && conversation.admins && (
          <div className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{conversation.admins.length} Admins</span>
          </div>
        )}
      </div>

      {/* Messages List Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-6 space-y-3"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-muted-foreground animate-pulse">
              Loading messages...
            </p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-red-500 font-medium">
              Failed to load messages. Please try again.
            </p>
          </div>
        ) : messages.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              No messages yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              Send a message below to start the conversation!
            </p>
          </div>
        ) : (
          messages.messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              currentUserId={currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Form */}
      <div className="p-4 border-t border-border bg-surface/80 backdrop-blur-md">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!text.trim() || isSending}
            className="px-5 py-3 rounded-xl flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
