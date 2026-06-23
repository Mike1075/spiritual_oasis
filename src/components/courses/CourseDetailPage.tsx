import Link from "next/link";
import LeadForm from "@/components/leads/LeadForm";
import type { CourseDetailData } from "@/data/courses/types";

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold text-white">{heading}</h2>
      {children}
    </section>
  );
}

export default function CourseDetailPage({ data }: { data: CourseDetailData }) {
  return (
    <article className="bg-[var(--ink)] text-white">
      <header className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="aura absolute left-1/2 top-0 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-60" />
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold sm:text-5xl">{data.title}</h1>
          <p className="mt-4 text-lg text-white/70">{data.subtitle}</p>
          {data.cta &&
            (data.cta.external ? (
              <a href={data.cta.href} target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 px-8 py-4 font-medium text-black transition hover:scale-105">
                {data.cta.label}
              </a>
            ) : (
              <Link href={data.cta.href}
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 px-8 py-4 font-medium text-black transition hover:scale-105">
                {data.cta.label}
              </Link>
            ))}
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-16 px-6 pb-28">
        <section className="space-y-4">
          {data.intro.map((p, i) => (
            <p key={i} className="leading-relaxed text-white/80">{p}</p>
          ))}
        </section>

        <Section heading="适合谁">
          <ul className="space-y-2">
            {data.forWhom.map((it, i) => (
              <li key={i} className="flex gap-3 text-white/80"><span className="text-emerald-300">·</span>{it}</li>
            ))}
          </ul>
        </Section>

        <Section heading="你会经历什么">
          <ul className="space-y-2">
            {data.experience.map((it, i) => (
              <li key={i} className="flex gap-3 text-white/80"><span className="text-emerald-300">·</span>{it}</li>
            ))}
          </ul>
        </Section>

        {data.schedule?.map((sec, i) => (
          <Section key={i} heading={sec.heading}>
            <div className="space-y-2">
              {sec.body.map((b, j) => (
                <p key={j} className="leading-relaxed text-white/80">{b}</p>
              ))}
            </div>
          </Section>
        ))}

        {data.notes && (
          <Section heading="注意事项">
            <ul className="space-y-2">
              {data.notes.map((n, i) => (
                <li key={i} className="flex gap-3 text-white/70"><span className="text-amber-300">·</span>{n}</li>
              ))}
            </ul>
          </Section>
        )}

        {data.faq && (
          <Section heading="常见问题">
            <div className="space-y-5">
              {data.faq.map((f, i) => (
                <div key={i}>
                  <p className="font-medium text-white">{f.q}</p>
                  <p className="mt-1 text-white/70">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section heading="留下联系方式">
          <LeadForm source={data.leadSource} pillar={data.pillar} />
        </Section>
      </div>
    </article>
  );
}
