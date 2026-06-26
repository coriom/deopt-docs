import Link from "next/link";

export const metadata = {
  title: "DeOpt Docs — Overview",
};

const STATUS_STRIP = [
  "Base Sepolia",
  "Testnet Beta",
  "Mainnet Disabled",
  "Unaudited",
  "No Real Funds",
];

interface HomeCard {
  href: string;
  title: string;
  blurb: string;
  testid: string;
}

const CARDS: HomeCard[] = [
  {
    href: "/developers",
    title: "Developers",
    blurb:
      "Public HTTP, WebSocket streams, wallet auth, signed intents, MM gateway.",
    testid: "docs-home-card-developers",
  },
  {
    href: "/academy",
    title: "Academy",
    blurb:
      "Options, perps, margin, RFQ, market making — explained from first principles.",
    testid: "docs-home-card-academy",
  },
  {
    href: "/protocol",
    title: "Protocol",
    blurb:
      "Architecture: terminal, backend, executor, indexer, contracts, MM gateway.",
    testid: "docs-home-card-protocol",
  },
  {
    href: "/reference",
    title: "Reference",
    blurb:
      "OpenAPI, AsyncAPI, ABIs, events, error codes, known limitations.",
    testid: "docs-home-card-reference",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <header className="flex flex-col gap-3 border-b border-zinc-900 pb-4">
        <h1
          data-testid="docs-home-title"
          className="text-3xl font-semibold tracking-tight text-zinc-100"
        >
          DeOpt Docs
        </h1>
        <p
          data-testid="docs-home-subtitle"
          className="max-w-3xl text-[13px] leading-relaxed text-zinc-400"
        >
          Documentation for DeOpt&apos;s public HTTP API, WebSocket streams,
          wallet-authenticated account data, signed intents, and
          operator-whitelisted MM gateway.
        </p>
        <div
          data-testid="docs-home-status-strip"
          className="flex flex-wrap items-center gap-1.5"
        >
          {STATUS_STRIP.map((s) => (
            <span
              key={s}
              className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-200"
            >
              {s}
            </span>
          ))}
        </div>
      </header>

      <section
        data-testid="docs-home-cards"
        className="grid gap-3 sm:grid-cols-2"
      >
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            data-testid={c.testid}
            className="group flex flex-col gap-2 rounded-md border border-zinc-900 bg-zinc-950 p-4 hover:border-emerald-500/40 hover:bg-emerald-500/5"
          >
            <span className="text-[15px] font-semibold text-zinc-100 group-hover:text-emerald-200">
              {c.title}
            </span>
            <span className="text-[12px] text-zinc-400">{c.blurb}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
              Read →
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-md border border-zinc-900 bg-zinc-950 p-4 text-[12px] text-zinc-400">
        <p>
          DeOpt is a programmable derivatives platform on Base Sepolia. The
          public API ships read endpoints, WebSocket streams, wallet-bound
          account data, and a signed-intent flow for trading. Order routing
          is handled by the executor; the indexer reconciles on-chain
          settlements. A separate operator-whitelisted MM gateway runs
          on WebTransport for high-throughput quoting and is not exposed
          to the public.
        </p>
      </section>
    </div>
  );
}
