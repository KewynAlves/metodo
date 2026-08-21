import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "base" | "surface";
};

export function Section({ id, children, className, variant = "base" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full px-6 py-24 sm:px-8 md:py-32 lg:py-40",
        variant === "surface" ? "bg-surface" : "bg-background",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-primary" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "mx-auto max-w-3xl text-center items-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance-tight text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="text-balance-tight max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HairlineDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent",
        className,
      )}
    />
  );
}
