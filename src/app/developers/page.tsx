import Link from "next/link";
import { Page, Section } from "@/components/Page";

export const metadata = {
  title: "API Overview — DeOpt Docs",
};

interface Profile {
  id: string;
  title: string;
  transport: string;
  auth: string;
  capabilities: string;
  notes: string;
}

const PROFILES: Profile[] = [
  {
    id: "human",
    title: "Public human",
    transport: "HTTP + public/private WebSocket",
    auth: "Wallet connect + gas-free EIP-191 auth signature",
    capabilities:
      "Read public data, subscribe to account streams, sign trading intents.",
    notes: "Default profile for every wallet-connected user.",
  },
  {
    id: "bot",
    title: "Advanced trader / bot",
    transport: "HTTP + private WebSocket",
    auth: "Wallet today; optional session-key model on the roadmap",
    capabilities:
      "Automates its own account, batches reads, replays REST flows safely.",
    notes:
      "Bots are not MMs. They have no privileged transport and no bulk / RFQ access unless explicitly operator-whitelisted.",
  },
  {
    id: "mm",
    title: "Operator-whitelisted MM",
    transport: "Separate WebTransport / QUIC / HTTP3 gateway",
    auth: "Wallet challenge / session key + operator permissions",
    capabilities:
      "Bulk submit, bulk cancel, cancel-all, quote replace, option / perp RFQ, cancel-on-disconnect.",
    notes:
      "Permission-gated. Off by default. Not exposed publicly. The public API does not expose WebTransport.",
  },
];

const PAGES: Array<{ href: string; title: string; blurb: string }> = [
  {
    href: "/developers/http-api",
    title: "HTTP API",
    blurb: "Endpoints, envelope, error codes.",
  },
  {
    href: "/developers/websocket-api",
    title: "WebSocket API",
    blurb: "GET /ws, methods, channels, wire shape.",
  },
  {
    href: "/developers/wallet-auth",
    title: "Wallet Authentication",
    blurb: "EIP-191 challenge / verify flow.",
  },
  {
    href: "/developers/signed-intents",
    title: "Signed Intents",
    blurb: "Trading flow, executor, broadcast.",
  },
  {
    href: "/developers/mm-gateway",
    title: "MM Gateway",
    blurb: "Operator-whitelisted WebTransport surface.",
  },
];

export default function DevelopersOverview() {
  return (
    <Page
      eyebrow="Developers"
      title="API Overview"
      intro="DeOpt exposes three public-facing developer profiles. They share the public HTTP API but differ in transport, auth, and capabilities."
    >
      <Section title="Profiles">
        <div className="overflow-hidden rounded-md border border-zinc-900">
          <table
            data-testid="developers-profile-table"
            className="w-full min-w-full border-separate border-spacing-0 text-[12px]"
          >
            <thead className="bg-zinc-950 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              <tr>
                <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Profile
                </th>
                <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Transport
                </th>
                <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Auth
                </th>
                <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Capabilities
                </th>
                <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {PROFILES.map((p) => (
                <tr
                  key={p.id}
                  data-testid={`developers-profile-row-${p.id}`}
                  className="hover:bg-zinc-900/40"
                >
                  <td className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-zinc-100">
                    {p.title}
                  </td>
                  <td className="border-b border-zinc-900 px-3 py-2 text-zinc-300">
                    {p.transport}
                  </td>
                  <td className="border-b border-zinc-900 px-3 py-2 text-zinc-300">
                    {p.auth}
                  </td>
                  <td className="border-b border-zinc-900 px-3 py-2 text-zinc-300">
                    {p.capabilities}
                  </td>
                  <td className="border-b border-zinc-900 px-3 py-2 text-zinc-400">
                    {p.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-zinc-500">
          Bot users use the public API. Only operator-whitelisted market
          makers receive a WebTransport endpoint and bulk / RFQ
          capabilities.
        </p>
      </Section>
      <Section title="Reference pages">
        <ul
          data-testid="developers-page-list"
          className="grid gap-2 sm:grid-cols-2"
        >
          {PAGES.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block rounded-md border border-zinc-900 bg-zinc-950 p-3 hover:border-emerald-500/40 hover:bg-emerald-500/5"
              >
                <span className="block text-[13px] font-semibold text-zinc-100">
                  {p.title}
                </span>
                <span className="block text-[12px] text-zinc-400">
                  {p.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}
