import { Page, Section } from "@/components/Page";

export const metadata = {
  title: "Protocol Architecture — DeOpt Docs",
};

interface Component {
  id: string;
  title: string;
  role: string;
}

const COMPONENTS: Component[] = [
  { id: "terminal", title: "Frontend terminal", role: "Trading UI, signed-intent flows, account streams." },
  { id: "http", title: "Backend HTTP API", role: "Public reads + signed-intent creation." },
  { id: "ws", title: "Public WebSocket", role: "Live snapshots and wallet-authenticated account streams." },
  { id: "intents", title: "Signed Intents", role: "User signs typed payload; executor broadcasts." },
  { id: "executor", title: "Executor", role: "Broadcasts validated signed payloads on-chain." },
  { id: "indexer", title: "Indexer / Reconciliation", role: "Reads on-chain settlements and reconciles state." },
  { id: "contracts", title: "Smart Contracts", role: "Margin, vault, oracle, router (Solidity)." },
  { id: "margin", title: "Margin Engine", role: "Initial / maintenance margin, portfolio rules." },
  { id: "vault", title: "Collateral Vault", role: "Holds collateral; settlement entry point." },
  { id: "oracle", title: "Oracle / Router", role: "Price source + routing for previews and risk." },
  { id: "mm", title: "MM Gateway", role: "Separate WebTransport surface for whitelisted MMs." },
];

export default function Protocol() {
  return (
    <Page
      eyebrow="Protocol"
      title="Architecture"
      intro="A compact map of every moving piece in DeOpt V2 and what each component owns."
    >
      <Section title="Components">
        <ul
          data-testid="protocol-components"
          className="grid gap-2 sm:grid-cols-2"
        >
          {COMPONENTS.map((c) => (
            <li
              key={c.id}
              data-testid={`protocol-component-${c.id}`}
              className="rounded-md border border-zinc-900 bg-zinc-950 p-3"
            >
              <div className="text-[13px] font-semibold text-zinc-100">
                {c.title}
              </div>
              <p className="mt-1 text-[12px] text-zinc-400">{c.role}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Trust model">
        <ul className="list-inside list-disc space-y-1">
          <li>Wallet signs every state-changing user action.</li>
          <li>
            The backend never holds custodial keys. The executor signs only
            its own transport-level authentication; never user intents.
          </li>
          <li>
            Settlement happens on-chain through the vault and margin
            engine; the indexer is read-only.
          </li>
          <li>
            The MM Gateway is operationally separated from the public
            surface: distinct listener, distinct config, distinct
            permission model.
          </li>
        </ul>
      </Section>
    </Page>
  );
}
