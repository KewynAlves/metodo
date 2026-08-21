import { EyeOff, MessageSquareOff, Activity, Unlink, Users } from "lucide-react";

import { Reveal, Section, SectionHeading } from "./primitives";

const pains = [
  {
    icon: MessageSquareOff,
    title: "Não sei o que dizer",
    text: "Texto temporário. A conversa morre em segundos e o silêncio parece ainda mais longo.",
  },
  {
    icon: EyeOff,
    title: "Sempre sou ignorado",
    text: "Texto temporário. Você está no ambiente, mas parece invisível para as pessoas.",
  },
  {
    icon: Activity,
    title: "Fico nervoso ao conversar",
    text: "Texto temporário. O corpo trava, a voz falha e a mente acelera sem controle.",
  },
  {
    icon: Unlink,
    title: "Nunca consigo criar conexão",
    text: "Texto temporário. As conversas acontecem, mas nada evoluiu de verdade.",
  },
  {
    icon: Users,
    title: "Vejo outros homens conseguindo",
    text: "Texto temporário. Parece natural para eles e impossível para você.",
  },
];

export function Pains() {
  return (
    <Section id="dores" variant="surface">
      <SectionHeading
        eyebrow="O ponto de partida"
        title={<>Se você se reconhece aqui, não está sozinho</>}
        description="Textos temporários para demonstrar a estrutura. Estas são as dores mais comuns entre homens que sentem que travam nas interações sociais."
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {pains.map((pain, i) => (
          <Reveal key={pain.title} delay={i * 0.07} className="h-full">
            <article className="group flex h-full flex-col gap-5 bg-elevated p-8 transition-colors duration-300 hover:bg-card md:p-10">
              <pain.icon
                className="size-6 text-primary transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              <h3 className="text-2xl leading-snug">{pain.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{pain.text}</p>
            </article>
          </Reveal>
        ))}
        <div className="hidden bg-elevated lg:block" />
      </div>
    </Section>
  );
}
