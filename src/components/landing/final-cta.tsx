import { Lock, ShieldCheck, Zap } from "lucide-react";

import ebook from "@/assets/ebook-3d.png";
import { CtaButton } from "./cta-button";
import { Eyebrow, Reveal } from "./primitives";

const trust = [
  { icon: Lock, label: "Pagamento seguro" },
  { icon: Zap, label: "Acesso imediato" },
  { icon: ShieldCheck, label: "Garantia de 7 dias" },
];

export function FinalCta() {
  return (
    <section id="final" className="relative overflow-hidden bg-background px-6 py-28 sm:px-8 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_100%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_65%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <Reveal>
          <img
            src={ebook}
            width={1024}
            height={1280}
            loading="lazy"
            alt="Ebook Método Sedutor"
            className="mx-auto w-40 drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] sm:w-48"
          />
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col items-center gap-8">
          <Eyebrow>Última chamada</Eyebrow>
          <h2 className="text-balance-tight text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            A sua próxima versão começa
            <span className="block text-primary">com uma decisão</span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Você pode fechar esta página e continuar exatamente onde está, ou tomar a decisão que vai mudar o jogo a partir de hoje por menos do que o preço de uma pizza. O próximo nível da sua confiança te espera. Clique abaixo e comece agora.
          </p>
          <CtaButton href="#oferta" size="xl">
            Quero o Método Sedutor
          </CtaButton>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {trust.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2">
                <item.icon className="size-3.5 text-primary" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
