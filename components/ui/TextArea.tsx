import React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function TextArea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextAreaProps) {
  const areaId =
    id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={areaId}
          className="block text-xs font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        className={`w-full rounded-xl bg-surface border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y min-h-22.5 ${
          error ? "border-red-500 focus:ring-red-500/40" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
