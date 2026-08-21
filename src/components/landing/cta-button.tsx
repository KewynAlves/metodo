import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "group relative inline-flex items-center justify-center gap-3 rounded-sm font-medium uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-accent)] hover:brightness-110 hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary hover:text-foreground hover:-translate-y-0.5",
      },
      size: {
        md: "px-7 py-3.5 text-xs sm:text-sm",
        lg: "px-9 py-4.5 text-sm",
        xl: "w-full px-10 py-5 text-sm sm:w-auto sm:text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof ctaVariants>;

export function CtaButton({ className, variant, size, children, ...props }: CtaProps) {
  return (
    <a className={cn(ctaVariants({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
}
