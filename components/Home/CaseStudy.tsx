import React from "react";
import SectionContainer from "@/components/shared/SectionContainer";
import CaseChart from "@/components/visuals/CaseChart";

export default function CaseStudy() {
  return (
    <SectionContainer
      title="Case study — Reliability under load"
      subtitle="A single focused engagement: reduce incidents, improve throughput, and make releases boring."
    >
      <div className="grid items-start gap-10 md:grid-cols-5">
        {/* Narrative timeline */}
        <div className="md:col-span-3">
          <ol className="relative ml-6 space-y-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-0.5rem)] before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-border before:to-accent/60">
            {[
              {
                label: "Problem",
                body:
                  "Critical service faced burst traffic and cascading retries, leading to degraded response and on-call churn.",
              },
              {
                label: "Approach",
                body:
                  "Backpressure & queues; budget-based retries; tunable timeouts; visibility via SLIs & structured logs.",
              },
              {
                label: "Outcome",
                body:
                  "Incident rate dropped, throughput stabilized, and deploys became predictable within weeks.",
              },
            ].map((step, i) => (
              <li key={step.label} className="group relative rounded-sm bg-card/90 p-5 ring-1 ring-border/70 transition-colors hover:bg-card">
                <span className="absolute -left-6 top-5 flex h-6 w-6 items-center justify-center rounded-[2px] bg-[hsl(var(--primary-soft))] font-mono text-[11px] font-semibold leading-none text-[hsl(var(--primary))] shadow-sm ring-1 ring-primary/30">
                  {i + 1}
                </span>
                <h3 className="mb-2 flex items-center gap-2 text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-foreground md:text-[0.95rem]">
                  <span className="h-3 w-1 rounded-[1px] bg-gradient-to-b from-primary to-accent" aria-hidden="true" />
                  {step.label}
                </h3>
                <p className="text-[0.9rem] leading-relaxed text-foreground/90 md:text-[0.95rem]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        {/* Chart (legend removed to reduce redundancy) */}
        <aside className="relative h-72 rounded-sm border border-border bg-card/95 p-4 md:col-span-2 md:h-full">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-transparent to-accent/40" />
          <div className="h-full w-full rounded-sm border border-dashed border-border/70 p-2">
            <div className="h-full w-full text-primary">
              <CaseChart className="h-full w-full" />
            </div>
          </div>
        </aside>
      </div>
      {/* Summary metrics */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { value: "-40%", label: "Incidents", tone: "destructive" },
          { value: "+25%", label: "Throughput", tone: "primary" },
          { value: "~2w", label: "Time to stability", tone: "accent" },
        ].map(card => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-sm border border-border/70 bg-card/95 p-6 text-center shadow-sm transition-colors hover:border-primary/50 hover:bg-card"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60" />
            <div className="text-3xl font-extrabold tracking-tight text-[hsl(var(--primary))] drop-shadow-sm md:text-4xl">
              {card.value}
            </div>
            <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
