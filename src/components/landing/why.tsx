import { X, Check } from "lucide-react";

import { Reveal, Section, SectionHeading } from "./primitives";

const myths = ["Dinheiro", "Beleza", "Altura", "Sorte"];
const truths = [
  "Presença é comportamento, não genética.",
  "Comunicação é técnica treinável.",
  "Confiança nasce de repetição e referência.",
  "Inteligência social se desenvolve com método.",
];

export function Why() {
  return (
    <Section id="por-que">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="Por que isso acontece"
          title={
            <>
              O problema nunca foi
              <span className="block text-muted-foreground">o que te disseram</span>
            </>
          }
          description="Texto temporário explicando que a dificuldade não vem de fatores externos, e sim da ausência de habilidades sociais treinadas."
        />

        <div className="flex flex-col gap-10">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Não é sobre isso
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {myths.map((myth) => (
                <li
                  key={myth}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-sm text-muted-foreground line-through decoration-primary/70"
                >
                  <X className="size-3.5 text-primary" aria-hidden />
                  {myth}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">É sobre isso</p>
            <ul className="mt-6 divide-y divide-border">
              {truths.map((truth) => (
                <li key={truth} className="flex items-start gap-4 py-5">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-base leading-relaxed text-foreground/90">{truth}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
