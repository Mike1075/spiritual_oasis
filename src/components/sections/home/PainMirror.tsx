import { PAIN } from "@/data/home";

export default function PainMirror() {
  return (
    <section className="warm-1 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif-sc text-3xl font-medium sm:text-4xl">{PAIN.heading}</h2>
        <ul className="mt-10 space-y-5">
          {PAIN.items.map((it) => (
            <li
              key={it}
              className="rise border-l-2 border-[var(--ember)]/60 pl-5 text-lg leading-relaxed text-[#ece2d2]/90"
            >
              {it}
            </li>
          ))}
        </ul>
        <p className="mt-12 font-serif-sc text-xl leading-relaxed text-[#f3ead9] sm:text-2xl">
          {PAIN.closer}
        </p>
      </div>
    </section>
  );
}
