import React from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function InputField({
  label,
  error,
  leftIcon,
  rightIcon,
  className = "",
  id,
  ...props
}: InputFieldProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-3.5 text-muted-foreground flex items-center pointer-events-none">{leftIcon}</div>}
        <input
          id={inputId}
          className={`w-full rounded-xl bg-surface border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${
            leftIcon ? "pl-10" : ""
          } ${rightIcon ? "pr-10" : ""} ${error ? "border-red-500 focus:ring-red-500/40" : ""} ${className}`}
          {...props}
        />
        {rightIcon && <div className="absolute right-3.5 text-muted-foreground flex items-center">{rightIcon}</div>}
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
