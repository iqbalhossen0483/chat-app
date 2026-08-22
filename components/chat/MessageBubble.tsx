import Avatar from "@/components/ui/Avatar";
import { Message } from "@/types/type";
import Typography from "../ui/Typography";

interface MessageBubbleProps {
  message?: Message;
  currentUserId?: string;
  draftMessage?: string;
}

export default function MessageBubble({
  message,
  currentUserId,
  draftMessage,
}: MessageBubbleProps) {
  const isMe = (message && message.sender === currentUserId) || draftMessage;

  const formattedTime =
    (message &&
      new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })) ||
    (draftMessage && "Sending...");

  return (
    <div
      className={`flex items-end gap-2.5 my-2 ${isMe ? "justify-end" : "justify-start"}`}
    >
      {!isMe && message && (
        <div className="mb-1">
          <Avatar name={message.sender} size="sm" />
        </div>
      )}
      <div
        className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm ${
          isMe
            ? "bg-primary rounded-br-none"
            : "bg-surface border border-border text-foreground rounded-bl-none"
        }`}
      >
        <Typography
          variant="body"
          className={`text-sm leading-relaxed wrap-words whitespace-pre-wrap ${isMe ? "text-white" : ""}`}
        >
          {message ? message.text : draftMessage}
        </Typography>
        <div
          className={`text-[10px] mt-1 text-right font-medium ${
            isMe ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
