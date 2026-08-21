import Typography from "@/components/ui/Typography";
import { Sparkles } from "lucide-react";
import CTAButton from "./CTAButton";
import PreviewCard from "./PreviewCard";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 text-center px-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold text-primary mb-8 border border-primary/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Enterprise-Grade Communication
          Platform
        </div>
        <Typography
          variant="h1"
          className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Secure & Instant Collaboration for{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Modern Teams
          </span>
        </Typography>
        <Typography
          variant="lead"
          className="text-muted-foreground mb-10 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Connect effortlessly through encrypted direct messages and managed
          group channels with real-time synchronization.
        </Typography>

        <CTAButton />

        <PreviewCard />
      </div>
    </section>
  );
}
