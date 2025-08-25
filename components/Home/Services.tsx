import { Cloud, Laptop, SquareTerminal, CircuitBoard } from "lucide-react";
import { easeInOut, m } from "framer-motion";
import React from "react";
import SectionContainer from "@/components/shared/SectionContainer";
// Icons: Cloud, Laptop, SquareTerminal, CircuitBoard actively used in features array.

const features = [
  {
    name: "Resilient systems",
    icon: <Cloud size={22} className="mx-auto text-[hsl(var(--primary))]" />,
    description: "Fault-tolerant architectures that fail soft & recover fast.",
    delay: 0.18,
  },
  {
    name: "Clean web apps",
    icon: <Laptop size={22} className="mx-auto text-[hsl(var(--primary))]" />,
    description: "Accessible, hierarchical, motion-aware UI engineering.",
    delay: 0.24,
  },
  {
    name: "Open tooling",
    icon: <SquareTerminal size={22} className="mx-auto text-[hsl(var(--primary))]" />,
    description: "Pragmatic libraries & docs to accelerate teams w/out debt.",
    delay: 0.30,
  },
  {
    name: "Systems mindset",
    icon: <CircuitBoard size={22} className="mx-auto text-[hsl(var(--primary))]" />,
    description: "Instrumentation, feedback loops & operability baked in.",
    delay: 0.36,
  },
];

type ServicesProps = Readonly<Omit<React.ComponentPropsWithoutRef<typeof SectionContainer>, 'title' | 'children'>>;

export default function Services(props: ServicesProps) {
  const animation = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.32, ease: easeInOut, delay: 0.08 + i * 0.06 },
    }),
  };

  return (
    <SectionContainer {...props} title="What I do" subtitle="A focused set of capabilities that produce reliable, maintainable software.">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <m.article
            key={f.name}
            className="group relative border border-border/70 bg-card/95 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={animation}
          >
            <div className="center mb-4 h-11 w-11 bg-[hsl(var(--primary-soft))] text-[hsl(var(--primary))] ring-1 ring-primary/25 transition-colors group-hover:bg-[hsl(var(--primary)/0.15)]">
              {f.icon}
            </div>
            <h3 className="mb-2 text-[0.95rem] font-semibold tracking-wide text-foreground/95 group-hover:text-foreground">{f.name}</h3>
            <p className="text-[0.8rem] leading-relaxed text-muted-foreground group-hover:text-foreground/90">{f.description}</p>
            <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[hsl(var(--primary))] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
          </m.article>
        ))}
      </div>
    </SectionContainer>
  );
}
