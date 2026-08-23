import { EyeOff, MessageSquareOff, Activity, Unlink, Users, Key } from "lucide-react";

import { Reveal, Section, SectionHeading } from "./primitives";

const pains = [
  {
    icon: MessageSquareOff,
    title: "Não sei o que dizer",
    text: "A conversa trava em poucos segundos, o clima pesa e o silêncio constrangedor parece durar uma eternidade.",
  },
  {
    icon: EyeOff,
    title: "Sempre sou ignorado",
    text: "Você está no mesmo ambiente, tenta interagir, mas parece invisível enquanto os outros prendem a atenção de todos.",
  },
  {
    icon: Activity,
    title: "Fico nervoso ao conversar",
    text: "O corpo trava, a voz falha sob pressão e a sua mente acelera tentando adivinhar a resposta 'perfeita'.",
  },
  {
    icon: Unlink,
    title: "Nunca consigo criar conexão",
    text: "Até rola uma troca inicial, mas a interação morre na superfície e nunca evolui para algo real ou magnético.",
  },
  {
    icon: Users,
    title: "Vejo outros homens conseguindo",
    text: "Parece natural para eles, enquanto você continua quebrando a cabeça tentando entender onde está errando.",
  },
  {
    icon: Key,
    title: "A culpa não é sua",
    text: "O problema nunca foi a sua essência, mas a falta de um método real que funcione sem precisar de máscaras.",
  },
];

export function Pains() {
  return (
    <Section id="dores" variant="surface">
      <SectionHeading
        eyebrow="O ponto de partida"
        title={<>Se você se reconhece aqui, não está sozinho</>}
        description="Estas são as travas invisíveis que impedem você de gerar atração real — e o motivo pelo qual você acaba sendo ignorado."
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {pains.map((pain, i) => {
          const isSolution = pain.title === "A culpa não é sua";

          return (
            <Reveal key={pain.title} delay={i * 0.07} className="h-full">
              <article 
                className={`group flex h-full flex-col gap-5 p-8 transition-all duration-300 md:p-10 ${
                  isSolution 
                    ? 'bg-background border border-primary/40 shadow-xl relative z-10' 
                    : 'bg-elevated hover:bg-card'
                }`}
              >
                <pain.icon
                  className={`size-6 transition-transform duration-300 group-hover:scale-110 ${
                    isSolution ? 'text-primary' : 'text-primary'
                  }`}
                  aria-hidden
                />
                <h3 className={`text-2xl leading-snug ${isSolution ? 'text-foreground font-medium' : ''}`}>
                  {pain.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pain.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}