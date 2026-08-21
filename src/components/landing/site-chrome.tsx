import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { CtaButton } from "./cta-button";

const navItems = [
  { label: "Método", href: "#metodo" },
  { label: "Conteúdo", href: "#conteudo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Autor", href: "#autor" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <a href="#hero" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-wide">Método Sedutor</span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Desenvolvimento masculino
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <CtaButton href="#oferta" className="hidden sm:inline-flex">
          Quero o Método
        </CtaButton>
      </div>
    </header>
  );
}

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-5 py-3.5 backdrop-blur-xl transition-transform duration-500 sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="leading-tight">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
            Acesso completo
          </p>
          <p className="font-display text-2xl text-primary">R$ 97</p>
        </div>
        <CtaButton href="#oferta" className="flex-1 justify-center">
          Quero o Método
        </CtaButton>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-14 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg">Método Sedutor</p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
        <nav aria-label="Links legais" className="flex flex-wrap gap-x-8 gap-y-3">
          {["Termos de uso", "Política de privacidade", "Contato"].map((label) => (
            <a
              key={label}
              href="#final"
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-[0.7rem] leading-relaxed text-muted-foreground/70">
        Aviso temporário. Este produto é material educacional de desenvolvimento pessoal e não
        garante resultados específicos.
      </p>
    </footer>
  );
}
