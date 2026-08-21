import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:opacity-90 shadow-sm shadow-primary/20",
    secondary: "bg-secondary text-foreground hover:opacity-90",
    outline:
      "border border-border bg-surface hover:bg-surface/80 text-foreground",
    ghost: "hover:bg-primary/10 text-foreground",
    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-500/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
