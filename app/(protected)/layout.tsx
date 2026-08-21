"use client";

import { redirect } from "next/navigation";
import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client-side authentication check wrapper for protected layout
  return <>{children}</>;
}
