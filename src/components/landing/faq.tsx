import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Section, SectionHeading } from "./primitives";

const faqs = [
  {
    q: "Para quem é o Método Sedutor?",
    a: "Para homens que buscam desenvolver confiança inabalável, postura magnética e habilidades sociais na prática, sem precisar recorrer a truques falsos ou personagens que não funcionam no mundo real.",
  },
  {
    q: "O método ensina frases prontas ou truques?",
    a: "Não. O foco é na transformação da mentalidade, postura e comunicação autêntica. Em vez de decorar falas robóticas, você desenvolve a capacidade natural de atrair e liderar interações",
  },
  {
    q: "Funciona para quem é muito tímido?",
    a: "Sim. O método foi desenhado exatamente para estruturar o passo a passo de quem sofre com ansiedade social ou timidez, mostrando como dar os primeiros passos de forma segura e progressiva.",
  },
  {
    q: "Como recebo o acesso?",
    a: "O acesso ao material completo é enviado de forma 100% digital e imediata para o seu e-mail logo após a confirmação do pagamento, permitindo que você comece a estudar instantaneamente em qualquer dispositivo.",
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "Os resultados dependem da sua dedicação em aplicar os conceitos no mundo real. Muitos alunos relatam mudanças significativas na percepção e nas abordagens logo na primeira semana de prática.",
  },
  {
    q: "E se eu não gostar?",
    a: "Se você aplicar o método e não vir resultados consistentes dentro de 7 dias, o seu investimento é devolvido integralmente. Risco zero para você.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="Perguntas frequentes"
          title={<>Dúvidas antes de começar</>}
        />

        <Reveal>
          <Accordion type="single" collapsible className="w-full border-t border-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-6 text-left font-display text-xl leading-snug hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-7 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
