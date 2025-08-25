import { cn } from "@/lib/utils";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionContainerProps {
  readonly id?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly action?: React.ReactNode; // optional right-aligned action (e.g., See all)
}

export default function SectionContainer(props: Readonly<SectionContainerProps>) {
  const { id, title, subtitle, children, className, action } = props;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("py-[var(--sp-9)] px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="container">
        {/** Header block */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          className={action ? "mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between" : "mb-16 text-center"}
        >
          <div className={action ? "max-w-2xl" : undefined}>
            <h2 className={action ? "mb-4 font-semibold tracking-tight text-3xl md:text-4xl" : "mb-6 font-semibold tracking-tight text-3xl md:text-5xl"}>{title}</h2>
            {subtitle && (
              <p className={action ? "text-base md:text-lg text-muted-foreground/90 readable-tight" : "mx-auto readable text-muted-foreground/90 text-base md:text-lg"}>
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </m.div>
        
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </m.div>
      </div>
    </section>
  );
}