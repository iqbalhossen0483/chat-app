"use client";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

const CTAButton = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
      {!user && (
        <Link href="/auth">
          <Button size="lg" className="w-full sm:w-auto gap-3 shadow-md">
            Get Started <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      )}
      <Link href="/chat">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          {user ? "Go to Chat" : "Access Platform"}
        </Button>
      </Link>
    </div>
  );
};

export default CTAButton;
