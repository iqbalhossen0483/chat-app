import React from "react";
import Typography from "../ui/Typography";

export default function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-surface py-8 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Typography className="text-sm">
          © 2026 VortexChat. All rights reserved.
        </Typography>
        <Typography className="text-sm">
          Designed for modern collaboration and secure enterprise communication.
        </Typography>
      </div>
    </footer>
  );
}
