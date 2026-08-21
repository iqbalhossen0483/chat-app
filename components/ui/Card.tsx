import React from "react";

export default function Card({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl glass-card transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-primary/50 hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
