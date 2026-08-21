import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";
import React from "react";

export default function FeatureCard({
  icon,
  title,
  description,
  accentClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentClass: string;
}) {
  return (
    <Card className="p-8 bg-surface border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${accentClass}`}
      >
        {icon}
      </div>
      <Typography variant="h4" className="font-bold mb-3">
        {title}
      </Typography>
      <Typography
        variant="body"
        className="text-muted-foreground text-sm leading-relaxed"
      >
        {description}
      </Typography>
    </Card>
  );
}
