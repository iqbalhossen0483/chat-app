import Typography from "@/components/ui/Typography";
import { Shield, Users, Zap } from "lucide-react";
import React from "react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-surface/50 border-t border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Typography variant="overline" className="mb-3 block">
            Core Capabilities
          </Typography>
          <Typography variant="h2" className="mb-4">
            Designed for Seamless Collaboration
          </Typography>
          <Typography variant="lead" className="text-sm">
            Everything your organization needs to communicate securely and
            efficiently in one unified workspace.
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Real-Time Synchronization"
            description="Experience immediate, zero-latency communication across private and team discussions."
            accentClass="bg-primary/10 text-primary"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Collaborative Team Channels"
            description="Organize discussions, manage membership, and delegate administration responsibilities efficiently."
            accentClass="bg-secondary/10 text-secondary"
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Robust Security & Privacy"
            description="Advanced access control and authenticated sessions to ensure all corporate conversations remain confidential."
            accentClass="bg-terracotta/10 text-terracotta"
          />
        </div>
      </div>
    </section>
  );
}
