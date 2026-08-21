"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.data) {
    return redirect("/");
  }
  return children;
};

export default AuthLayout;
