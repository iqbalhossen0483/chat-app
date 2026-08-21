"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import { apiSlice } from "@/store/api/apiSlice";
import { useAppDispatch } from "@/store/store";
import ChatLayout from "@/components/chat/ChatLayout";

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
        apiSlice.util.updateQueryData(
          "getMessages",
          message.conversation,
          (draft) => {
            if (!draft.some((m) => m._id === message._id)) {
              draft.push(message);
            }
          }
        )
      );
      dispatch(apiSlice.util.invalidateTags(["Conversation"]));
    });

    socket.on("conversation:updated", () => {
      dispatch(apiSlice.util.invalidateTags(["Conversation"]));
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

