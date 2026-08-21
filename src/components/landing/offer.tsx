import { Check, CreditCard, Lock, ShieldCheck, Barcode, QrCode } from "lucide-react";

import ebook from "@/assets/ebook-3d.png";
import { CtaButton } from "./cta-button";
import { Reveal, Section, SectionHeading } from "./primitives";

const included = [
  "Ebook completo em PDF (7 módulos)",
  "Acesso imediato após a compra",
  "Atualizações futuras inclusas",
  "Leitura prática em qualquer dispositivo",
  "Garantia incondicional de 7 dias",
];

export function Offer() {
  return (
    <Section id="oferta">
      <SectionHeading
        eyebrow="A oferta"
        title={<>Comece hoje sua evolução</>}
        description="Valores temporários apenas para demonstrar a estrutura do card de oferta."
      />

      <Reveal className="mt-16">
        <div className="relative overflow-hidden rounded-sm border border-primary/30 bg-elevated shadow-[var(--shadow-accent)]">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:p-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-sm bg-primary/15 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-primary">
                  Oferta de lançamento
                </span>
                <h3 className="text-3xl sm:text-4xl">Método Sedutor — Acesso completo</h3>
              </div>

              <ul className="flex flex-col gap-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-5 border-t border-border pt-7 text-muted-foreground">
                {[CreditCard, Barcode, QrCode].map((Icon, i) => (
                  <Icon key={i} className="size-6" aria-hidden />
                ))}
                <span className="text-xs uppercase tracking-[0.2em]">
                  Cartão · Pix · Boleto
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 rounded-sm border border-border bg-background/60 p-8 text-center sm:p-10">
              <img
                src={ebook}
                width={1024}
                height={1280}
                loading="lazy"
                alt="Ebook Método Sedutor"
                className="w-32 drop-shadow-[0_24px_50px_rgba(0,0,0,0.8)]"
              />

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground line-through">De R$ 297,00</p>
                <p className="font-display text-6xl leading-none text-primary">R$ 97</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Pagamento único
                </p>
              </div>

              <CtaButton href="#final" size="xl">
                Quero o Método Sedutor
              </CtaButton>

              <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Lock className="size-3.5 text-primary" aria-hidden />
                  Compra 100% segura
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-primary" aria-hidden />
                  7 dias de garantia
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
