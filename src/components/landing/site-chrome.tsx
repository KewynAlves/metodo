import { useEffect, useState } from "react";
import logo from "@/assets/Logo Metodo Sedutor.png";
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
        <a href="#hero" className="flex items-center gap-3 leading-none">
        <img 
          src={logo} 
          alt="Logo Método Sedutor" 
          className="h-10 w-auto object-contain" 
        />
        <div className="flex flex-col">
          <span className="font-display text-lg tracking-wide">Método Sedutor</span>
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Desenvolvimento masculino
          </span>
        </div>
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
          <p className="font-display text-2xl text-primary">R$ 29,90</p>
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
    <footer className="border-t border-border bg-surface px-6 pt-14 pb-28 sm:px-8 sm:pb-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Lado Esquerdo: Marca e Direitos */}
        <div className="text-center lg:text-left">
          <p className="font-display text-lg">Método Sedutor</p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Marco Montana. Todos os direitos reservados.
          </p>
        </div>

        {/* Centro: Redes Sociais */}
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Redes Sociais
          </span>
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Lado Direito: Links Legais */}
        <nav aria-label="Links legais" className="flex flex-wrap justify-center lg:justify-end items-center gap-x-8 gap-y-3">
          {[
            { label: "Termos de uso", href: "/termos" },
            { label: "Política de privacidade", href: "/privacidade" },
            { label: "Contato", href: "contato" },
          ].map((item) => (
            <a
              key={item.label}
            href={item.href}
            className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap"
          >
            {item.label}
         </a>
       ))}
    </nav>

      </div>

      {/* Disclaimer Inferior */}
      <p className="mx-auto mt-10 max-w-6xl text-center lg:text-left text-[0.7rem] leading-relaxed text-muted-foreground/75">
        Este produto é educacional e de desenvolvimento pessoal. Os resultados podem variar de acordo com o esforço e a dedicação individual de cada aluno.
      </p>
    </footer>
  );
}