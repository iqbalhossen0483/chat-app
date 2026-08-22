import React, { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { useSendMessageMutation } from "@/store/api/chatApiSlice";
import { errorHandler } from "@/services/error/errorHandler";

interface ChatInputFormProps {
  conversationId: string;
}

type DraftMessage = { text: string; status: string } | null;

export default function ChatInputForm({ conversationId }: ChatInputFormProps) {
  const [text, setText] = useState("");
  const [, setDraftMessage] = useState<DraftMessage>(null);
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;

    try {
      setDraftMessage({ text, status: "pending" });
      await sendMessage({
        conversationId,
        text: text.trim(),
      }).unwrap();
      setText("");
    } catch (err) {
      errorHandler(err, "Failed to send message");
    }
  };

  return (
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
  );
}
