import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";

export default function page() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent/>

    </div>
  );
}
