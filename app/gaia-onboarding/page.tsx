"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GaiaOnboardingHome() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center py-20 px-6">
      
      {/* Logo / Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-emerald-700">
          Meet Gaia — Your Sustainability Copilot
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          Start your sustainability journey with our guided freemium workflow.
          Upload your data, analyze hotspots, generate reduction strategies, and
          see how Gaia can help you build a decarbonized future.
        </p>
      </div>

      {/* Workflow Overview Card */}
      <Card className="w-full max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Freemium Guided Workflow</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-muted-foreground">
          <p className="text-sm">
            Gaia will walk you through a step-by-step sustainability workflow:
          </p>

          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Upload Activity & Supplier Data</li>
            <li>Run Data Quality Checks</li>
            <li>Emission Factor Mapping</li>
            <li>Footprint Computation</li>
            <li>Hotspot Insights</li>
            <li>Decarbonization Planning</li>
            <li>Supplier Engagement Strategy</li>
          </ul>

          <div className="pt-6">
            <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href="/gaia-onboarding/workflow/upload">
                Start Workflow
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA to existing SaaS */}
      <div className="mt-10 text-center">
        <p className="text-muted-foreground text-sm">
          Already a full user?
        </p>
        <Link
          href="/dashboard"
          className="text-emerald-700 underline text-sm font-medium"
        >
          Access the complete Gaia Sustainability OS →
        </Link>
      </div>
    </div>
  );
}






