import Link from "next/link";
import { Page, Section } from "@/components/Page";

export const metadata = {
  title: "Reference — DeOpt Docs",
};

interface RefItem {
  id: string;
  title: string;
  blurb: string;
  status: "Available" | "Planned" | "See Limitations";
  href?: string;
  external?: boolean;
}

const ITEMS: RefItem[] = [
  {
    id: "openapi",
    title: "OpenAPI",
    blurb: "OpenAPI 3 spec for every public HTTP endpoint.",
    status: "Available",
  },
  {
    id: "asyncapi",
    title: "AsyncAPI",
    blurb: "AsyncAPI for the public WebSocket protocol.",
    status: "Planned",
  },
  {
    id: "abis",
    title: "ABIs",
    blurb: "Solidity ABIs for vault, margin, oracle, router.",
    status: "Planned",
  },
  {
    id: "events",
    title: "Events",
    blurb: "On-chain event schema, indexer event types.",
    status: "Planned",
  },
  {
    id: "errors",
    title: "Error Codes",
    blurb: "SCREAMING_SNAKE_CASE error codes shared by HTTP and WebSocket.",
    status: "Available",
    href: "/developers/http-api",
  },
  {
    id: "limitations",
    title: "Known Limitations",
    blurb: "What does not work yet and what is intentionally absent.",
    status: "See Limitations",
    href: "/limitations",
  },
];

function statusClass(s: RefItem["status"]): string {
  if (s === "Available") return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
  if (s === "Planned") return "border-zinc-700 bg-zinc-900 text-zinc-400";
  return "border-zinc-800 bg-black/40 text-zinc-300";
}

export default function Reference() {
  return (
    <Page
      eyebrow="Reference"
      title="Reference Hub"
      intro="Machine-readable specs, ABIs, events, error codes, and known limitations."
    >
      <Section title="Entries">
        <ul
          data-testid="reference-entries"
          className="grid gap-2 sm:grid-cols-2"
        >
          {ITEMS.map((it) => {
            const card = (
              <div
                data-testid={`reference-entry-${it.id}`}
                className="flex h-full flex-col gap-2 rounded-md border border-zinc-900 bg-zinc-950 p-3 hover:border-emerald-500/40 hover:bg-emerald-500/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-zinc-100">
                    {it.title}
                  </span>
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] ${statusClass(it.status)}`}
                  >
                    {it.status}
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400">{it.blurb}</p>
              </div>
            );
            return (
              <li key={it.id}>
                {it.href ? <Link href={it.href}>{card}</Link> : card}
              </li>
            );
          })}
        </ul>
      </Section>
    </Page>
  );
}
