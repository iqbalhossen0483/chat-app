import React from "react";

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
        Sign in to your account
      </h2>
      <p className="text-sm text-muted-foreground">
        Enter your phone number and name to continue.
      </p>
    </div>
  );
}

