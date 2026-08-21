import {
  Brain,
  Compass,
  Handshake,
  Mic,
  PersonStanding,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";

import { Reveal, Section, SectionHeading } from "./primitives";

const benefits = [
  { icon: Brain, title: "Mentalidade sólida", text: "Texto temporário sobre clareza mental." },
  { icon: Mic, title: "Conversas fluidas", text: "Texto temporário sobre comunicação." },
  { icon: PersonStanding, title: "Linguagem corporal", text: "Texto temporário sobre postura." },
  { icon: Handshake, title: "Inteligência social", text: "Texto temporário sobre leitura social." },
  { icon: Sparkles, title: "Presença marcante", text: "Texto temporário sobre presença." },
  { icon: Target, title: "Direção clara", text: "Texto temporário sobre objetivos." },
  { icon: Compass, title: "Autoconhecimento", text: "Texto temporário sobre identidade." },
  { icon: Timer, title: "Resultado prático", text: "Texto temporário sobre aplicação." },
];

export function Benefits() {
  return (
    <Section id="beneficios">
      <SectionHeading
        eyebrow="Benefícios"
        title={<>O que muda quando você evolui</>}
        description="Textos temporários. Cada item representa um ganho concreto do processo de desenvolvimento proposto pelo método."
      />

      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, i) => (
          <Reveal key={benefit.title} delay={(i % 4) * 0.06}>
            <div className="flex flex-col gap-4">
              <div className="flex size-11 items-center justify-center rounded-sm border border-border bg-elevated">
                <benefit.icon className="size-5 text-primary" aria-hidden />
              </div>
              <h3 className="text-xl">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{benefit.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
