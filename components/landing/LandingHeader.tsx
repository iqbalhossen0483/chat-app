import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25">
            <MessageSquare className="w-5 h-5" />
          </div>
          <Typography
            variant="h3"
            className="font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            VortexChat
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="primary" size="sm" className="gap-2">
              Launch Platform <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
