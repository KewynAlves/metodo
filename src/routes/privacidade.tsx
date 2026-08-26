import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileCtaBar } from "@/components/landing/site-chrome";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacidade")({
  component: PrivacidadePage,
});

function PrivacidadePage() {
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

        <h1 className="font-display text-4xl sm:text-5xl mb-4 tracking-tight">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-12">Última atualização: Agosto de 2026</p>
        
        <div className="space-y-8 bg-card/30 border border-border/50 p-6 sm:p-10 rounded-2xl backdrop-blur-sm text-sm text-muted-foreground leading-relaxed">
          
          {/* Seção 1 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">1. Compromisso com a Privacidade</h2>
            <p>
              A sua privacidade é de extrema importância para nós. Esta Política de Privacidade explica de forma transparente como o <strong>Método Sedutor</strong>, gerido por <strong>Marco Montana</strong>, coleta, utiliza, armazena e protege as informações dos usuários que acessam o site <code>sedutor.shop</code> e adquirem nossos infoprodutos.
            </p>
            <p>
              Ao utilizar este site, você concorda expressamente com as práticas descritas nesta política.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">2. Quem Somos</h2>
            <p>
              O <strong>Método Sedutor</strong> é um ecossistema educacional voltado ao desenvolvimento pessoal masculino, inteligência social e comunicação. Caso tenha qualquer dúvida sobre esta política ou sobre o tratamento de seus dados, entre em contato através do e-mail oficial: <a href="mailto:metodosedutor1@gmail.com" className="text-primary hover:underline">metodosedutor1@gmail.com</a>.
            </p>
          </section>

          {/* Seção 3 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">3. Dados que Coletamos</h2>
            <p>Podemos coletar as seguintes informações fornecidas por você ou geradas durante a navegação:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nome completo;</li>
              <li>Endereço de e-mail;</li>
              <li>Número de telefone / WhatsApp (quando informado);</li>
              <li>Informações relacionadas à compra de produtos digitais;</li>
              <li>Dados de navegação, como endereço IP, tipo de navegador, dispositivo, páginas visitadas e tempo de permanência.</li>
            </ul>
          </section>

          {/* Seção 4 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">4. Como Utilizamos os Seus Dados</h2>
            <p>As informações coletadas são utilizadas estritamente para as seguintes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processar pagamentos e transações de forma segura;</li>
              <li>Liberar e gerenciar o acesso aos produtos adquiridos;</li>
              <li>Prestar suporte ao cliente e tirar dúvidas;</li>
              <li>Enviar comunicações essenciais sobre a sua compra ou atualizações do ecossistema;</li>
              <li>Aprimorar a experiência de navegação e desempenho do site;</li>
              <li>Medir e otimizar campanhas de marketing e publicidade autorizadas;</li>
              <li>Cumprir obrigações legais e regulatórias vigentes.</li>
            </ul>
          </section>

          {/* Seção 5 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">5. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para otimizar a sua experiência de navegação. Ferramentas analíticas e de publicidade de terceiros, como o <strong>Meta Pixel</strong> e o <strong>Google Analytics</strong>, também podem ser empregadas para compreender o comportamento dos visitantes e aprimorar nossas campanhas.
            </p>
            <p>
              Você pode desativar os cookies diretamente nas configurações do seu navegador, ficando ciente de que algumas funcionalidades da plataforma poderão ser limitadas.
            </p>
          </section>

          {/* Seção 6 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">6. Compartilhamento de Dados</h2>
            <p>
              Os dados coletados poderão ser compartilhados exclusivamente com parceiros essenciais para a operação do negócio, tais como plataformas de processamento de pagamentos, ferramentas de hospedagem, automação de e-mail marketing e sistemas de análise.
            </p>
            <p className="font-medium text-foreground">
              Ressaltamos que nós jamais vendemos, alugamos ou comercializamos dados pessoais dos nossos usuários.
            </p>
          </section>

          {/* Seção 7 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">7. Segurança e Armazenamento</h2>
            <p>
              Adotamos rígidas medidas técnicas e administrativas de segurança para proteger os dados pessoais contra acessos não autorizados, perdas ou alterações. Embora utilizemos padrões de mercado reconhecidos, nenhum sistema digital é 100% imune a falhas.
            </p>
          </section>

          {/* Seção 8 */}
          <section className="space-y-2">
            <h2 className="text-foreground font-semibold text-lg text-primary">8. Seus Direitos (LGPD) e Disposições</h2>
            <p>
              Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD), você possui o direito de solicitar a confirmação do tratamento, acesso, correção, anonimização ou exclusão de seus dados pessoais a qualquer momento através do nosso canal de suporte oficial.
            </p>
          </section>

        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}