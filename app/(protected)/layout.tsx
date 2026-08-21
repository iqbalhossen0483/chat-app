"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: Props) {
  const session = useSession();

  if (!session.data) {
    redirect("/auth");
  }
  return children;
}
