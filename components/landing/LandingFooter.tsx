import React from "react";

export default function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-surface py-8 text-center text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 VortexChat. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">
          Designed for modern collaboration and secure enterprise communication.
        </p>
      </div>
    </footer>
  );
}
