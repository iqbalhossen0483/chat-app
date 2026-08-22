"use client";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useTheme();
  return children;
};

export default ThemeProvider;
