"use client";

import ChatLayout from "@/components/chat/ChatLayout";
import { useAppDispatch } from "@/store";
import { chatApiSlice } from "@/store/api/chatApiSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function ChatPage() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!session?.accessToken) return;

    const socketUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api$/, "") ||
      "https://frontend-task-chatapp.onrender.com";

    const socket = io(socketUrl, {
      auth: {
        token: session.accessToken,
      },
    });

    socket.on("message:new", (message) => {
      dispatch(
        chatApiSlice.util.updateQueryData(
          "getMessages",
          message.conversation,
          (draft) => {
            if (!draft.some((m) => m._id === message._id)) {
              draft.push(message);
            }
          },
        ),
      );
      dispatch(chatApiSlice.util.invalidateTags(["Conversation"]));
    });

    socket.on("conversation:updated", () => {
      dispatch(chatApiSlice.util.invalidateTags(["Conversation"]));
    });

    return () => {
      socket.disconnect();
    };
  }, [session?.accessToken, dispatch]);

  const currentUser = {
    id: session?.user?.id,
    name: session?.user?.name,
    phone: session?.user?.phone,
  };

  return <ChatLayout currentUser={currentUser} />;
}
