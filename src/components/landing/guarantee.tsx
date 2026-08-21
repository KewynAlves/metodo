import { ShieldCheck } from "lucide-react";

import { Eyebrow, Reveal, Section } from "./primitives";

export function Guarantee() {
  return (
    <Section id="garantia" variant="surface">
      <Reveal>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <div className="relative flex size-24 items-center justify-center rounded-full border border-primary/40">
            <span aria-hidden className="absolute inset-2 rounded-full bg-primary/10" />
            <ShieldCheck className="relative size-9 text-primary" aria-hidden />
          </div>
          <Eyebrow>Garantia</Eyebrow>
          <h2 className="text-balance-tight text-4xl leading-tight sm:text-5xl">
            7 dias de garantia incondicional
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Texto temporário. Se por qualquer motivo o método não fizer sentido para você, o
            reembolso é integral — sem perguntas, sem burocracia.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
