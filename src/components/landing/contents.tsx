import { FileText, Zap, BookOpen } from "lucide-react";

import ebook from "@/assets/ebook-3d.png";
import { Reveal, Section, SectionHeading } from "./primitives";

const modules = [
  { 
    title: "Módulos 01 — 02", 
    text: "Identidade Masculina e Autoconfiança na Prática" 
  },
  { 
    title: "Módulos 03 — 04", 
    text: "Rejeição e Abordagem Natural" 
  },
  { 
    title: "Módulos 05 — 06", 
    text: "Conversa, Inteligência Social e Flerte Natural" 
  },
  { 
    title: "Módulos 07 — 08", 
    text: "Linguagem Corporal, Presença e Autocuidado" 
  },
  { 
    title: "Módulos 09 — 10", 
    text: "Vida Social Interessante e Disciplina Diária" 
  },
  { 
    title: "Módulos Bônus 11 — 14", 
    text: "Aprofundamento avançado e ferramentas extras" 
  },
  { 
    title: "Plano de Transformação", 
    text: "Cronograma prático para 7, 30 e 90 dias" 
  },
];

const specs = [
  { icon: FileText, label: "Formato PDF" },
  { icon: Zap, label: "Acesso imediato" },
  { icon: BookOpen, label: "Leitura prática" },
];

export function Contents() {
  return (
    <Section id="conteudo" variant="surface">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <div className="relative flex flex-col items-center gap-10">
            <div
              aria-hidden
              className="absolute inset-x-8 top-1/3 -z-10 h-1/2 rounded-full bg-primary/15 blur-[80px]"
            />
            <img
              src={ebook}
              width={1024}
              height={1280}
              loading="lazy"
              alt="Mockup 3D do ebook com os módulos do Método Sedutor"
              className="w-[62%] max-w-xs drop-shadow-[0_40px_70px_rgba(0,0,0,0.8)] sm:w-[45%] lg:w-[85%]"
            />
            <ul className="flex flex-wrap justify-center gap-3">
              {specs.map((spec) => (
                <li
                  key={spec.label}
                  className="inline-flex items-center gap-2 rounded-sm border border-border bg-elevated px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-muted-foreground"
                >
                  <spec.icon className="size-3.5 text-primary" aria-hidden />
                  {spec.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Conteúdo do método"
            title={<>Tudo o que você vai encontrar dentro</>}
            description="O mapa completo da sua evolução, dividido em módulos práticos para aplicação imediata"
          />

          <ol className="mt-12 divide-y divide-border border-y border-border">
            {modules.map((mod, i) => (
              <Reveal key={mod.title} delay={i * 0.05}>
                <li className="group flex items-start gap-6 py-6 transition-colors duration-300 hover:bg-elevated/60 md:px-2">
                  <span className="font-display text-2xl text-primary/80 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl leading-snug">{mod.title}</h3>
                    <p className="text-sm text-muted-foreground">{mod.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
