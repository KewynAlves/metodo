import { ShieldCheck, MessagesSquare, Flame } from "lucide-react";

import { Reveal, Section, SectionHeading } from "./primitives";

const pillars = [
  {
    icon: ShieldCheck,
    label: "Pilar 01",
    title: "Autoconfiança",
    text: "Construção de uma presença inabalável. A base sólida de quem não se abala com o ambiente e domina a própria postura.",
  },
  {
    icon: MessagesSquare,
    label: "Pilar 02",
    title: "Comunicação",
    text: "A arte de prender a atenção sem esforço. Conversas naturais, escuta ativa e o fim definitivo do branco na hora de falar.",
  },
  {
    icon: Flame,
    label: "Pilar 03",
    title: "Atração Natural",
    text: "Atrair como consequência da sua evolução genuína, eliminando qualquer postura robótica ou técnica barata de manipulação.",
  },
];

export function Method() {
  return (
    <Section id="metodo" variant="surface">
      <SectionHeading
        eyebrow="O Método Sedutor"
        title={
          <>
            Três pilares. <span className="text-primary">Uma transformação.</span>
          </>
        }
        description="Um sistema direto ao ponto para quem quer evoluir de verdade, sem truques baratos ou fórmulas mágicas que não funcionam na vida real."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.1} className="h-full">
            <article className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-sm border border-border bg-elevated p-9 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 md:p-10">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-center justify-between">
                <pillar.icon className="size-7 text-primary" aria-hidden />
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {pillar.label}
                </span>
              </div>
              <h3 className="text-3xl">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
