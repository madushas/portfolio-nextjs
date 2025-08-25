import * as React from "react";
import { cn } from "@/lib/utils";

// Chip variants encode semantic emphasis & surface style
// size: sm (10/11px), md (12/13px)
// variant: muted (subtle bg), outline (transparent bg + border), solid (accent emphasis), primary (brand color)
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "muted" | "outline" | "solid" | "primary";
  size?: "sm" | "md";
  asChild?: boolean; // future slot support
}

const baseStyles =
  "inline-flex items-center rounded-[var(--r-1)] font-medium tracking-wide select-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none transition-colors";

const variantStyles: Record<string, string> = {
  muted: "bg-muted border border-border text-muted-foreground",
  outline: "border border-border text-foreground",
  solid: "bg-accent text-foreground border border-border",
  primary: "bg-[hsl(var(--primary)/0.15)] text-primary border border-[hsl(var(--primary)/0.3)]",
};

const sizeStyles: Record<string, string> = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-3 py-1",
};

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant = "muted", size = "sm", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  },
);
Chip.displayName = "Chip";
