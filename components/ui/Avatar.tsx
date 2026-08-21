import Image from "next/image";
import React from "react";

export default function Avatar({
  src,
  name,
  size = "md",
  status,
  className = "",
}: {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}) {
  const sizeClasses = {
    xs: "w-7 h-7 text-xs",
    sm: "w-9 h-9 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const statusSizes = {
    xs: "w-2 h-2 bottom-0 right-0",
    sm: "w-2.5 h-2.5 bottom-0 right-0",
    md: "w-3 h-3 bottom-0.5 right-0.5",
    lg: "w-3.5 h-3.5 bottom-1 right-1",
    xl: "w-4 h-4 bottom-1.5 right-1.5",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500",
  };

  const getInitials = (str?: string) => {
    if (!str) return "U";
    const parts = str.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div
      className={`relative inline-flex shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <Image
          height={100}
          width={100}
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full rounded-full object-cover shadow-sm"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-primary/15 text-primary font-semibold flex items-center justify-center shadow-sm">
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={`absolute rounded-full ring-2 ring-surface ${statusSizes[size]} ${statusColors[status]}`}
        />
      )}
    </div>
  );
}
