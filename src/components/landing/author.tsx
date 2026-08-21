import authorPhoto from "@/assets/author.jpg";
import { Reveal, Section, SectionHeading } from "./primitives";

const timeline = [
  { year: "2016", text: "Texto temporário do início da jornada." },
  { year: "2019", text: "Texto temporário sobre estudo e prática." },
  { year: "2022", text: "Texto temporário sobre mentorias presenciais." },
  { year: "2026", text: "Texto temporário sobre a criação do Método Sedutor." },
];

export function Author() {
  return (
    <Section id="autor" variant="surface">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal>
          <figure className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 border border-border/60"
              style={{ borderRadius: 2 }}
            />
            <img
              src={authorPhoto}
              width={1024}
              height={1280}
              loading="lazy"
              alt="Retrato do autor do Método Sedutor"
              className="aspect-4/5 w-full rounded-sm object-cover shadow-[var(--shadow-elegant)]"
            />
            <figcaption className="mt-5 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Nome do autor · Mentor de desenvolvimento masculino
            </figcaption>
          </figure>
        </Reveal>

        <div className="flex flex-col gap-10">
          <SectionHeading
            align="left"
            eyebrow="Sobre o autor"
            title={<>Uma história antes de um método</>}
            description="Texto temporário. Aqui entram história pessoal, autoridade construída e a missão do autor com o Método Sedutor."
          />

          <Reveal delay={0.1}>
            <p className="border-l-2 border-primary pl-6 text-lg leading-relaxed text-foreground/90 italic">
              “Frase temporária de missão do autor, resumindo em uma linha a visão sobre evolução
              masculina.”
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <ol className="relative border-l border-border pl-8">
              {timeline.map((item) => (
                <li key={item.year} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute -left-[2.28rem] top-1.5 size-2 rounded-full bg-primary ring-4 ring-surface"
                  />
                  <p className="font-display text-2xl text-foreground">{item.year}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
