import { Page, Section } from "@/components/Page";

export const metadata = {
  title: "DeOpt Academy — DeOpt Docs",
};

interface Module {
  id: string;
  title: string;
  blurb: string;
  status: "Outline" | "In progress";
}

const MODULES: Module[] = [
  { id: "options-basics", title: "Options Basics", blurb: "Calls, puts, payoffs, exercise.", status: "Outline" },
  { id: "greeks", title: "Greeks", blurb: "Delta, gamma, theta, vega — intuitively.", status: "Outline" },
  { id: "perps", title: "Perps", blurb: "Funding, mark price, liquidations.", status: "Outline" },
  { id: "margin", title: "Margin", blurb: "Initial vs. maintenance, portfolio margin.", status: "Outline" },
  { id: "rfq", title: "RFQ", blurb: "Request-for-quote workflow vs. orderbook.", status: "Outline" },
  { id: "mm", title: "Market Making", blurb: "Inventory, quoting, hedging.", status: "Outline" },
  { id: "onchain", title: "On-chain Derivatives", blurb: "Custody, settlement, oracle.", status: "Outline" },
  { id: "risk", title: "Risk and Liquidations", blurb: "How DeOpt handles risk events.", status: "Outline" },
];

export default function Academy() {
  return (
    <Page
      eyebrow="Academy"
      title="DeOpt Academy"
      intro="Concept-first explainers for options, perps, margin, RFQ, and market making. Outlines are published as they are written — no filler."
    >
      <Section title="Modules">
        <ul
          data-testid="academy-modules"
          className="grid gap-2 sm:grid-cols-2"
        >
          {MODULES.map((m) => (
            <li
              key={m.id}
              data-testid={`academy-module-${m.id}`}
              className="rounded-md border border-zinc-900 bg-zinc-950 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold text-zinc-100">
                  {m.title}
                </span>
                <span className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                  {m.status}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-zinc-400">{m.blurb}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Approach">
        <p>
          Each module starts with the question a trader actually asks (why
          does my delta drift overnight? why does perp funding flip
          sign?) and answers it before adding the math. Code snippets
          target the DeOpt API directly so a reader can immediately
          reproduce what they just read.
        </p>
      </Section>
    </Page>
  );
}
