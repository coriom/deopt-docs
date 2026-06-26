import type { ReactNode } from "react";

interface PageProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

export function Page({ eyebrow, title, intro, children }: PageProps) {
  return (
    <article className="flex flex-col gap-6 pb-12">
      <header className="flex flex-col gap-2 border-b border-zinc-900 pb-4">
        {eyebrow ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          {title}
        </h1>
        {intro ? (
          <p className="max-w-3xl text-[13px] leading-relaxed text-zinc-400">
            {intro}
          </p>
        ) : null}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </article>
  );
}

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="flex flex-col gap-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-[13px] leading-relaxed text-zinc-300">
        {children}
      </div>
    </section>
  );
}
