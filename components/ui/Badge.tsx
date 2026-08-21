import React from "react";

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "outline";
  className?: string;
}) {
  const variants = {
    primary: "bg-primary/15 text-primary border border-primary/25",
    secondary: "bg-secondary/20 text-secondary border border-secondary/30",
    success: "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30",
    warning: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30",
    danger: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30",
    outline: "border border-border text-muted-foreground bg-surface",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
