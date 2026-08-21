"use client";

import AuthForm from "@/components/auth/AuthForm";
import AuthHeader from "@/components/auth/AuthHeader";
import Card from "@/components/ui/Card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 selection:bg-primary/25 selection:text-primary">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <MessageSquare className="w-7 h-7" />
          </div>
        </div>

        <Card className="p-8 shadow-2xl glass-panel border border-border/80">
          <AuthHeader />
          <AuthForm />
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}
