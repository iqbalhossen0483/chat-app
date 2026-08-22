"use client";

import ChatLayout from "@/components/chat/ChatLayout";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  const { data: session } = useSession();
  useSocket();

  const currentUser = {
    id: session?.user?.id,
    name: session?.user?.name,
    phone: session?.user?.phone,
  };

  return <ChatLayout currentUser={currentUser} />;
}
