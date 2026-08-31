import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileCtaBar } from "@/components/landing/site-chrome";
import { ArrowLeft, Mail, Clock, MessageSquare, Instagram } from "lucide-react";

export const Route = createFileRoute("/contato")({
  component: ContatoPage,
});

function ContatoPage() {
    useEffect(() => {
    document.title = "Contato | Método Sedutor"; // <--- Adicione este bloco
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      <SiteHeader />
      
      <main className="flex-1 mx-auto max-w-3xl px-6 pt-36 pb-24 w-full">
        {/* Botão de Voltar */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Voltar para a página inicial
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl mb-4 tracking-tight">Central de Atendimento</h1>
        <p className="text-sm text-muted-foreground mb-12">
          Precisa de ajuda com o seu acesso, dúvidas sobre o método ou suporte? Nossa equipe está pronta para te atender.
        </p>
        
        <div className="space-y-6">
          
          {/* Card Principal de E-mail */}
          <div className="bg-card/30 border border-border/50 p-6 sm:p-8 rounded-2xl backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-widest">
                <Mail className="w-4 h-4" />
                E-mail Oficial de Suporte
              </div>
              <h2 className="text-foreground font-semibold text-xl">contato@sedutor.shop</h2>
              <p className="text-xs text-muted-foreground">Envie sua dúvida detalhada para agilizar o atendimento.</p>
            </div>
            
            <a 
              href="mailto:metodosedutor1@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-95 transition-opacity whitespace-nowrap shadow-lg shadow-primary/20"
            >
              Enviar E-mail
            </a>
          </div>

          {/* Grid de Informações Secundárias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card de Prazo */}
            <div className="bg-card/30 border border-border/50 p-6 rounded-2xl backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                Tempo de Resposta
              </div>
              <h3 className="text-foreground font-semibold text-base">Atendimento Rápido</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Respondemos a todas as solicitações por ordem de chegada em até <strong className="text-foreground">24 horas úteis</strong>.
              </p>
            </div>

            {/* Card de Redes Sociais */}
            <div className="bg-card/30 border border-border/50 p-6 rounded-2xl backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium text-xs uppercase tracking-widest">
                <Instagram className="w-4 h-4" />
                Redes Sociais
              </div>
              <h3 className="text-foreground font-semibold text-base">Acompanhe o Autor</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fique por dentro das novidades, conteúdos e atualizações exclusivas diretamente nos canais oficiais do Marco Montana.
              </p>
            </div>

          </div>

        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}