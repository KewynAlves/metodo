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
  quote?: string;
  type: "text" | "video" | "chat-image";
  videoUrl?: string;
  imageUrl?: string; 
  avatarUrl?: string; 
};

const testimonials: Testimonial[] = [
  {
    name: "Robinho Silva",
    detail: "19 anos · São Paulo",
    type: "chat-image",
    imageUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/insta-robinhos",
    avatarUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/avatar-cris", 
  },
  {
    name: "Thiago Meltzer",
    detail: "31 anos · Sobral",
    quote: "Eu conheci mais garotas e abordei mais garotas em um dia do que em um ano inteiro. O medo e a ansiedade sumiram.",
    type: "video",
    videoUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/depoimento-metodo-sedutor-transformacao.mp4?v=2",
    avatarUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/avatar-thiago", 
  },
  {
    name: "Caio Oliveira",
    detail: "25 anos · Recife",
    type: "chat-image",
    imageUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/insta-caio",
    avatarUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/avatar-caio",
  },
  {
    name: "Rafael Mendes",
    detail: "26 anos · Porto Alegre",
    type: "chat-image",
    imageUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/insta-rafael.png",
    avatarUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/avatar-rafael.jpg",
  },
  {
    name: "Carlos Santos",
    detail: "38 anos · Sergipe",
    quote: "Parece que ganhei superpoderes. A insegurança sumiu e agora eu tenho total controle de quem eu sou.",
    type: "video",
    videoUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/depoimentoCarlos.mp4",
    avatarUrl: "https://guizywnxpx2dq0bu.public.blob.vercel-storage.com/avatar-carlos.jpg",
  },
];

export function Testimonials() {
  return (
    <Section id="depoimentos">
      <SectionHeading
        eyebrow="Depoimentos"
        title={<>Homens que decidiram evoluir</>}
        description="Veja os resultados na prática de quem aplicou o método e transformou completamente a sua realidade"
      />

      <Reveal className="mt-16">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-6">
            {testimonials.map((item, i) => (
              <CarouselItem key={i} className="pl-6 sm:basis-1/2 lg:basis-1/3">
                <article className="flex h-full flex-col gap-6 rounded-sm border border-border bg-elevated p-8">
                  
                  {item.type === "video" ? (
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-sm border border-border bg-black">
                      {item.videoUrl ? (
                        <video
                          src={item.videoUrl}
                          controls
                          controlsList="nodownload"
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover"
                        >
                          Seu navegador não suporta a tag de vídeo.
                        </video>
                      ) : (
                        <>
                          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Play className="size-4 translate-x-px" aria-hidden />
                          </span>
                          <span className="sr-only">Espaço para depoimento em vídeo</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-sm border border-border bg-transparent">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={`Print de conversa de ${item.name}`}
                          className="w-full object-contain"
                        />
                      ) : (
                        <div className="flex aspect-video items-center justify-center p-6 text-center text-xs text-muted-foreground">
                          Espaço para o Print da Conversa
                        </div>
                      )}
                    </div>
                  )}

                  {item.type === "chat-image" && (
                    <Quote className="size-7 text-primary/70" aria-hidden />
                  )}

                  <div className="flex gap-1" aria-label="Avaliação 5 de 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-primary text-primary" aria-hidden />
                    ))}
                  </div>

                  {item.quote && (
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      “{item.quote}”
                    </p>
                  )}

                  <footer className="flex items-center gap-4 border-t border-border pt-6 mt-auto">
                    <div
                      aria-hidden
                      className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-muted/40 text-[10px] text-muted-foreground">
                          Foto
                        </span>
                      )}
                    </div>
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