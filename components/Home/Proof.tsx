import React from "react";
import SectionContainer from "@/components/shared/SectionContainer";
import { Quote } from "lucide-react";

type ProofProps = Readonly<Pick<React.HTMLAttributes<HTMLDivElement>, 'id' | 'className' | 'style'>>;

export default function Proof(props: ProofProps) {
  return (
    <SectionContainer title="Trusted outcomes" subtitle="Signals of reliability & execution impact." {...props}>
      <figure className="relative mx-auto max-w-4xl border border-border/70 bg-card/95 p-10 shadow-sm md:p-12">
        <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-md">
          <Quote size={18} />
        </div>
        <blockquote className="text-balance text-lg font-medium leading-relaxed text-foreground/95 md:text-xl">
          “Madusha raised our reliability bar. We saw fewer incidents and a clearer path to shipping without fire drills.”
        </blockquote>
        <div className="mt-6 h-px w-20 bg-gradient-to-r from-[hsl(var(--primary))] to-transparent" aria-hidden="true" />
        <figcaption className="mt-4 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center bg-[hsl(var(--primary-soft))] text-[0.8rem] font-semibold tracking-wide text-foreground ring-1 ring-primary/25">
            MK
          </div>
          <div className="leading-tight">
            <div className="text-[0.9rem] font-semibold text-foreground">M. K.</div>
            <div className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">Eng. Manager, SaaS</div>
          </div>
        </figcaption>
      </figure>
    </SectionContainer>
  );
}
