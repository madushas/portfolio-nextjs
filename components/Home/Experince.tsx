import React, { HTMLProps, useState, useId } from "react";
import { BriefcaseIcon, ChevronDownIcon, ExternalLinkIcon } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experiences";

const ExperienceSection = (props: Readonly<HTMLProps<HTMLDivElement>>) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const timelineId = useId();

  return (
    <section {...props} className="container py-[var(--sp-9)]">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
  <h2 id={timelineId} className="mb-6 font-semibold tracking-tight text-3xl md:text-5xl">Work Experience</h2>
        <p className="readable mx-auto text-muted-foreground">
          A journey through my professional experience and the impact I&apos;ve made along the way.
        </p>
      </m.div>
      {/* Updated timeline container classes */}
      <ol className="relative mx-auto max-w-4xl border-l border-border/50 pl-6 md:pl-8 [counter-reset:exp]" aria-labelledby={timelineId}>
        {experiences.map((exp, index) => {
          const open = expandedId === index;
          return (
            <li key={exp.company} className="group relative mb-12 last:mb-0">
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1], delay: index * 0.05 }}
                className="contents"
              >
                {/* Node */}
                <span className="absolute -left-[50px] top-3 grid h-7 w-7 place-content-center rounded-full border border-border bg-background text-[11px] font-medium text-muted-foreground shadow-sm transition-colors group-hover:border-primary group-hover:text-primary">
                  {index + 1}
                </span>
                {/* Card */}
                <div className={`relative overflow-hidden rounded-[var(--r-2)] border border-border bg-card transition-all duration-300 group-hover:shadow-md group-focus-within:shadow-md ${open ? "border-primary" : "hover:border-[hsl(var(--primary)/0.4)]"}`}>
                  <button
                    onClick={() => setExpandedId(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-start gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:gap-5 md:px-6"
                  >
                    <div className="mt-0.5 rounded-[var(--r-1)] bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/15">
                      <BriefcaseIcon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-3 md:gap-4">
                        <h3 className="text-lg font-semibold leading-tight tracking-tight md:text-xl">{exp.company}</h3>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground md:text-xs">
                          <span className="whitespace-nowrap">{exp.duration}</span>
                          <span className="inline-block h-1 w-1 rounded-full bg-border" />
                          <span className="whitespace-nowrap">{exp.location}</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm font-medium text-accent-foreground/90 md:text-[15px]">{exp.position}</p>
                    </div>
                    <ChevronDownIcon className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden px-5 pb-6 pt-1 md:px-6"
                      >
                        <ul className="mb-4 space-y-2 text-[13px] leading-relaxed text-foreground/90 md:text-sm">
                          {exp.description.map((item) => (
                            <li key={item} className="relative pl-4">
                              <span className="absolute left-0 top-2 h-2 w-2 rounded-sm bg-primary/70" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mb-4 flex flex-wrap gap-2 md:gap-2.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-[var(--r-1)] border border-border/70 bg-accent/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground/90 md:text-[12px]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                          >
                            Visit Company <ExternalLinkIcon className="h-4 w-4" />
                          </a>
                        )}
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </m.div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ExperienceSection;
