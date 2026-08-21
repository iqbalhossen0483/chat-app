import React from "react";

export default function Typography({
  variant = "body",
  className = "",
  children,
  ...props
}: {
  variant?: "h1" | "h2" | "h3" | "h4" | "lead" | "body" | "caption" | "overline";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  switch (variant) {
    case "h1":
      <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${className}`} {...props}>
        {children}
      </h1>;
    case "h2":
      return <h2 className={`text-3xl font-bold tracking-tight ${className}`} {...props}>{children}</h2>;
    case "h3":
      return <h3 className={`text-2xl font-semibold tracking-tight ${className}`} {...props}>{children}</h3>;
    case "h4":
      return <h4 className={`text-xl font-semibold ${className}`} {...props}>{children}</h4>;
    case "lead":
      return <p className={`text-lg text-muted-foreground ${className}`} {...props}>{children}</p>;
    case "body":
      return <p className={`text-base text-foreground ${className}`} {...props}>{children}</p>;
    case "caption":
      return <span className={`text-xs text-muted-foreground ${className}`} {...props}>{children}</span>;
    case "overline":
      return <span className={`text-xs uppercase tracking-widest font-semibold text-primary ${className}`} {...props}>{children}</span>;
    default:
      return <p className={`text-base text-foreground ${className}`} {...props}>{children}</p>;
  }
}
