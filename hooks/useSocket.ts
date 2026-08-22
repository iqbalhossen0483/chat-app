import { useAppDispatch } from "@/store";
import { chatApiSlice } from "@/store/api/chatApiSlice";
import { Message } from "@/types/type";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!session?.accessToken) return;

    const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    if (!socketUrl) return;

    const socket = io(socketUrl, {
      auth: {
        token: session.accessToken,
      },
    });

    socket.on("message:new", (message: Message) => {
      dispatch(
        chatApiSlice.util.updateQueryData(
          "getMessages",
          message.conversation,
          (draft) => {
            if (!draft.messages.some((m) => m._id === message._id)) {
              draft.messages.push(message);
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
}
