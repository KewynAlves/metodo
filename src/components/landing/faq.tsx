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
    a: "Resposta temporária. Para homens que querem desenvolver confiança, comunicação e habilidades sociais de forma estruturada.",
  },
  {
    q: "O método ensina frases prontas ou truques?",
    a: "Resposta temporária. Não. O foco é desenvolvimento pessoal real: mentalidade, presença e inteligência social.",
  },
  {
    q: "Funciona para quem é muito tímido?",
    a: "Resposta temporária. Sim, o conteúdo começa pelos fundamentos e evolui em etapas progressivas.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Resposta temporária. O acesso é imediato após a confirmação do pagamento, em formato PDF.",
  },
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "Resposta temporária. Depende da aplicação, mas o material é pensado para prática desde o primeiro módulo.",
  },
  {
    q: "E se eu não gostar?",
    a: "Resposta temporária. Você tem 7 dias de garantia incondicional com reembolso integral.",
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
