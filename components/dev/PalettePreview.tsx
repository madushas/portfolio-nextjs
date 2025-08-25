"use client";
import React from "react";

// Simple dev-only palette preview. Remove or guard with env flag for production.
// Renders semantic color tokens in both light and dark contexts side by side.

const semantic = [
  "background","foreground","card","card-foreground","popover","popover-foreground","primary","primary-foreground","secondary","secondary-foreground","muted","muted-foreground","accent","accent-foreground","destructive","destructive-foreground","border","input","ring" as const
];

const rampPrefixes = ["brand","accent","neutral"];

const Shade: React.FC<{ name:string; varName:string }> = ({ name, varName }) => (
  <div className="flex flex-col items-start select-none text-[10px] font-medium" data-var={varName}>
    <div className="token-swatch w-20 h-10 rounded-[2px] border border-border/40" data-color={varName} />
    <span className="mt-1 tabular-nums text-[9px] text-muted-foreground">{name}</span>
  </div>
);

export const PalettePreview: React.FC = () => {
  const semanticRules = semantic.map(s => `.token-swatch[data-color="--${s}"]{background:var(--${s});}`).join("");
  const rampRules = rampPrefixes.map(prefix => (
    Array.from({length:12}).map((_,i)=>`.token-swatch[data-color="--${prefix}-${i+1}"]{background:var(--${prefix}-${i+1});}`).join("")
  )).join("");
  const styleContent = semanticRules + rampRules;
  return (
    <div className="not-prose mt-10 grid gap-10 md:grid-cols-2" aria-label="Design token palette preview">
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div className="space-y-4">
        <h3 className="font-mono text-xs font-bold tracking-wider text-muted-foreground">SEMANTIC</h3>
        <div className="flex flex-wrap gap-4">
          {semantic.map(s => <Shade key={s} name={s} varName={`--${s}`} />)}
        </div>
        <h3 className="pt-4 font-mono text-xs font-bold tracking-wider text-muted-foreground">RAMPS</h3>
        {rampPrefixes.map(prefix => (
          <div key={`ramp-${prefix}`} className="mb-3">
            <div className="mb-1 font-mono text-[10px] tracking-wide text-muted-foreground">{prefix}</div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 12 }).map((_,i) => (
                <Shade key={`${prefix}-${i+1}`} name={`${prefix}-${i+1}`} varName={`--${prefix}-${i+1}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-sm border border-border/60 bg-neutral-2/40 p-4 dark:bg-neutral-3/30">
        <h3 className="font-mono text-xs font-bold tracking-wider text-muted-foreground">CONTRAST SNAPSHOT</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-[2px] bg-background p-3 shadow-sm ring-1 ring-border/60">
            <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">Light Context</span>
            <button className="rounded-[2px] bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground shadow hover:bg-[hsl(var(--primary)/0.9)]">Primary CTA</button>
            <button className="rounded-[2px] border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-secondary-foreground hover:bg-[hsl(var(--secondary)/0.8)]">Secondary</button>
            <div className="rounded-[2px] border border-border bg-card p-2 text-[11px]">Card Surface</div>
          </div>
          <div className="flex flex-col gap-2 rounded-[2px] bg-neutral-12 p-3 shadow-sm ring-1 ring-border/40">
            <span className="text-[11px] font-semibold tracking-wide text-neutral-3">Dark Context</span>
            <button className="rounded-[2px] bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground shadow hover:bg-[hsl(var(--primary)/0.9)]">Primary CTA</button>
            <button className="rounded-[2px] border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-secondary-foreground hover:bg-[hsl(var(--secondary)/0.7)]">Secondary</button>
            <div className="rounded-[2px] border border-border bg-card p-2 text-[11px] text-foreground">Card Surface</div>
          </div>
        </div>
        <p className="text-[10px] leading-relaxed text-muted-foreground/80">This panel provides a quick visual smoke test of semantic layers & action colors across light & dark. Remove before production.</p>
      </div>
    </div>
  );
};

export default PalettePreview;
