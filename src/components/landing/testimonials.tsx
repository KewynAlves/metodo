import { Play, Star, Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal, Section, SectionHeading } from "./primitives";

type Testimonial = {
  name: string;
  detail: string;
  quote: string;
  type: "text" | "video";
};

const testimonials: Testimonial[] = [
  {
    name: "Nome do aluno",
    detail: "24 anos · São Paulo",
    quote: "Depoimento temporário para demonstrar o layout do card e o comportamento do slider.",
    type: "text",
  },
  {
    name: "Nome do aluno",
    detail: "31 anos · Curitiba",
    quote: "Espaço preparado para depoimento em vídeo. O player final entra nesta área.",
    type: "video",
  },
  {
    name: "Nome do aluno",
    detail: "19 anos · Recife",
    quote: "Depoimento temporário mostrando um relato mais longo, com quebra natural de linhas.",
    type: "text",
  },
  {
    name: "Nome do aluno",
    detail: "36 anos · Porto Alegre",
    quote: "Depoimento temporário. Aqui entram resultados concretos relatados pelo aluno.",
    type: "text",
  },
  {
    name: "Nome do aluno",
    detail: "27 anos · Belo Horizonte",
    quote: "Outro espaço preparado para vídeo, mantendo a mesma proporção dos demais cards.",
    type: "video",
  },
];

export function Testimonials() {
  return (
    <Section id="depoimentos">
      <SectionHeading
        eyebrow="Depoimentos"
        title={<>Homens que decidiram evoluir</>}
        description="Seção preparada para vídeos, fotos e avaliações. Os conteúdos abaixo são temporários."
      />

      <Reveal className="mt-16">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {testimonials.map((item, i) => (
              <CarouselItem key={i} className="pl-6 sm:basis-1/2 lg:basis-1/3">
                <article className="flex h-full flex-col gap-6 rounded-sm border border-border bg-elevated p-8">
                  {item.type === "video" ? (
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-sm border border-border bg-background">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Play className="size-4 translate-x-px" aria-hidden />
                      </span>
                      <span className="sr-only">Espaço para depoimento em vídeo</span>
                    </div>
                  ) : (
                    <Quote className="size-7 text-primary/70" aria-hidden />
                  )}

                  <div className="flex gap-1" aria-label="Avaliação 5 de 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-primary text-primary" aria-hidden />
                    ))}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    “{item.quote}”
                  </p>

                  <footer className="flex items-center gap-4 border-t border-border pt-6">
                    <span
                      aria-hidden
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      MS
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </footer>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-10 flex items-center justify-center gap-4">
            <CarouselPrevious className="static size-11 translate-y-0 rounded-sm border-border bg-elevated hover:bg-card" />
            <CarouselNext className="static size-11 translate-y-0 rounded-sm border-border bg-elevated hover:bg-card" />
          </div>
        </Carousel>
      </Reveal>
    </Section>
  );
}
