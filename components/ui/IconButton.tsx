import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const IconButton = ({ children, className = "", ...props }: Props) => {
  return (
    <button
      className={`p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-border/40 transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
