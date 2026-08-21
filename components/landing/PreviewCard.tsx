import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import React from "react";

export default function PreviewCard() {
  return (
    <Card className="p-6 text-left max-w-2xl mx-auto glass-panel border border-border/60 shadow-xl">
      <div className="flex items-center gap-3 mb-3">
        <Avatar name="Alex Morgan" status="online" size="sm" />
        <div>
          <Typography variant="body" className="font-semibold text-sm">
            Alex Morgan
          </Typography>
          <Typography variant="caption" className="text-muted-foreground">
            Online • Secure Session Active
          </Typography>
        </div>
      </div>
      <p className="text-xs text-muted-foreground bg-primary/5 p-3 rounded-xl leading-relaxed">
        &quot;Secure session established with real-time message synchronization and strict privacy controls for all team communications.&quot;
      </p>
    </Card>
  );
}
