import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

import ebook from "@/assets/ebook-3d.png";
import { CtaButton } from "./cta-button";
import { Eyebrow } from "./primitives";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[92svh] w-full items-center overflow-hidden px-6 pb-20 pt-32 sm:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          className="flex flex-col items-start gap-8"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>Desenvolvimento masculino</Eyebrow>

          <h1 className="text-balance-tight text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            Pare de ser ignorado
            <span className="block text-primary">Desperte interesse sem fingir ser quem você não é.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Descubra o segredo da verdadeira conquista através de uma evolução real de presença, comunicação e mentalidade — sem máscaras, sem joguinhos.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <CtaButton href="#oferta" size="lg">
              Quero o Método Sedutor
            </CtaButton>
            <CtaButton href="#metodo" variant="outline" size="lg">
              Conheça o Método
            </CtaButton>
          </div>

          <dl className="mt-2 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            {[
              ["+2.400", "homens"],
              ["4,9/5", "avaliação"],
              ["100%", "prático"],
            ].map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl text-foreground">{value}</dd>
                <span className="text-xs uppercase tracking-[0.2em]">{label}</span>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="absolute inset-x-6 top-1/2 -z-10 h-3/4 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]"
          />
          <motion.img
            src={ebook}
            width={1024}
            height={1280}
            alt="Mockup 3D do ebook Método Sedutor"
            className="w-[80%] max-w-md drop-shadow-[0_40px_80px_rgba(0,0,0,0.85)] sm:w-[65%] lg:w-[100%] lg:max-w-none"
            animate={reduce ? { y: 0 } : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <a
        href="#dores"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <motion.span
          className="flex flex-col items-center gap-2"
          animate={reduce ? { y: 0 } : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Rolar</span>
          <ChevronDown className="size-4" aria-hidden />
        </motion.span>
      </a>
    </section>
  );
}
