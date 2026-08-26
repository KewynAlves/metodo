import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileCtaBar } from "@/components/landing/site-chrome";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/termos")({
  component: TermosPage,
});

function TermosPage() {
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

        <h1 className="font-display text-4xl sm:text-5xl mb-4 tracking-tight">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-12">Última atualização: Agosto de 2026</p>
        
        <div className="space-y-8 bg-card/30 border border-border/50 p-6 sm:p-10 rounded-2xl backdrop-blur-sm text-sm text-muted-foreground leading-relaxed">
          
          {/* Seção 1 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">1. Boas-vindas ao Método Sedutor</h2>
            <p>
              Bem-vindo ao <strong>Método Sedutor</strong>, desenvolvido e gerido por <strong>Marco Montana</strong>. Ao acessar este site (`sedutor.shop`), navegar por suas páginas ou adquirir qualquer um de nossos infoprodutos digitais, você declara ter lido, compreendido e aceitado integralmente estes Termos de Uso e a nossa Política de Privacidade.
            </p>
            <p>
              Caso não concorde com qualquer disposição destes termos, recomendamos que interrompa imediatamente o uso do site e não realize aquisições.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">2. Objeto e Conteúdo</h2>
            <p>
              O <strong>Método Sedutor</strong> é uma plataforma educacional voltada ao desenvolvimento pessoal masculino, inteligência social e aprimoramento de habilidades de comunicação. Disponibilizamos conteúdos digitais, incluindo videoaulas, e-books, materiais complementares e mentorias quando aplicável.
            </p>
          </section>

          {/* Seção 3 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">3. Acesso ao Produto e Pagamentos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Liberação:</strong> Após a confirmação do pagamento, o acesso ao conteúdo é enviado digitalmente pelo e-mail cadastrado ou liberado na plataforma de membros correspondente.</li>
              <li><strong>Processamento Seguro:</strong> Os pagamentos são processados por plataformas terceirizadas especializadas. O Método Sedutor não armazena dados confidenciais ou financeiros de cartões de crédito em seus servidores locais.</li>
            </ul>
          </section>

          {/* Seção 4 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">4. Propriedade Intelectual e Direitos Autorais</h2>
            <p>
              Todo o material disponibilizado no ecossistema do Método Sedutor é protegido pelas leis brasileiras e internacionais de direitos autorais. O acesso é estritamente <strong>pessoal e intransferível</strong>. É expressamente proibido:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Copiar, reproduzir ou plagiar o conteúdo, total ou parcialmente;</li>
              <li>Revender, sublicenciar ou distribuir o material comercialmente;</li>
              <li>Disponibilizar os arquivos ou dados de acesso em grupos de Telegram/WhatsApp, redes sociais ou sites de compartilhamento de arquivos piratas;</li>
              <li>Compartilhar seu login e senha de acesso com terceiros.</li>
            </ul>
            <p className="text-xs pt-1">
              O descumprimento destas regras configura piratagem e violação de direitos autorais, sujeitando o infrator às medidas judiciais cíveis e criminais cabíveis.
            </p>
          </section>

          {/* Seção 5 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">5. Natureza Educativa e Isenção de Resultados</h2>
            <p>
              Os conteúdos oferecidos possuem finalidade exclusivamente educacional, informativa e de autodesenvolvimento. Os resultados práticos dependem inteiramente do esforço, dedicação, consistência e contexto individual de cada aluno. Por isso, <strong>não garantimos resultados financeiros, amorosos ou sociais específicos</strong>, eximindo o autor de qualquer responsabilidade sobre o desempenho prático de terceiros.
            </p>
          </section>

          {/* Seção 6 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">6. Segurança e Uso Adequado</h2>
            <p>
              O usuário compromete-se a utilizar o site de forma ética. É terminantemente proibido tentar burlar sistemas de segurança, realizar ataques de negação de serviço, utilizar robôs/scripts automatizados para extração de dados ou comprometer a integridade do domínio.
            </p>
          </section>

          {/* Seção 7 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">7. Garantias e Reembolsos</h2>
            <p>
              Os prazos e regras de garantia e reembolso seguem estritamente o informado na página oficial de vendas do produto no momento da compra, respeitando os prazos legais do Código de Defesa do Consumidor e as políticas operacionais da plataforma de pagamento intermediadora.
            </p>
          </section>

          {/* Seção 8 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">8. Disposições Finais e Contato</h2>
            <p>
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Em caso de dúvidas, solicitações ou suporte técnico, utilize exclusivamente o canal de atendimento oficial:
            </p>
            <p className="text-foreground font-medium pt-1">
              E-mail de suporte: <a href="mailto:metodosedutor1@gmail.com" className="text-primary hover:underline">metodosedutor1@gmail.com</a>
            </p>
          </section>

        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}