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
  { icon: Brain, title: "Mentalidade sólida", text: "Clareza mental para blindar sua autoconfiança contra o julgamento alheio e a ansiedade social." },
  { icon: Mic, title: "Conversas fluidas", text: "O fim definitivo do 'branco' na hora de puxar assunto. Você vai saber exatamente o que dizer e como manter o papo interessante." },
  { icon: PersonStanding, title: "Linguagem corporal", text: "Postura de quem ocupa o espaço com naturalidade, transmitindo respeito e firmeza sem esforço." },
  { icon: Handshake, title: "Inteligência social", text: "Capacidade de ler o ambiente, entender dinâmicas de grupo e se adaptar com facilidade a qualquer situação." },
  { icon: Sparkles, title: "Presença marcante", text: "Aquela postura magnética que faz você ser notado assim que entra em um lugar, sem precisar chamar atenção à força." },
  { icon: Target, title: "Direção clara", text: "Metas e objetivos alinhados para você parar de patinar e focar no que realmente traz resultados na sua vida." },
  { icon: Compass, title: "Autoconhecimento", text: "Compreensão real dos seus pontos fortes para construir uma identidade masculina autêntica e inabalável." },
  { icon: Timer, title: "Resultado prático", text: "Aplicações diárias direto ao ponto, focadas no que funciona no mundo real e longe de teorias vazias." },
];

export function Benefits() {
  return (
    <Section id="beneficios">
      <SectionHeading
        eyebrow="Benefícios"
        title={<>O que muda quando você evolui</>}
        description="Cada item representa um ganho concreto do processo de desenvolvimento proposto pelo método."
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
