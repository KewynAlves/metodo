import { createFileRoute } from "@tanstack/react-router";

import { Author } from "@/components/landing/author";
import { Benefits } from "@/components/landing/benefits";
import { Contents } from "@/components/landing/contents";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Guarantee } from "@/components/landing/guarantee";
import { Hero } from "@/components/landing/hero";
import { Method } from "@/components/landing/method";
import { Offer } from "@/components/landing/offer";
import { Pains } from "@/components/landing/pains";
import { MobileCtaBar, SiteFooter, SiteHeader } from "@/components/landing/site-chrome";
import { Testimonials } from "@/components/landing/testimonials";
import { Why } from "@/components/landing/why";

const title = "Método Sedutor — Confiança, Comunicação e Presença Masculina";
const description =
  "Método premium de desenvolvimento masculino: autoconfiança, comunicação e inteligência social para homens que querem evoluir de verdade.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Pains />
        <Why />
        <Method />
        <Benefits />
        <Contents />
        <Testimonials />
        <Author />
        <Offer />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}
