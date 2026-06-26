// FRONTEND-DOCS-SPLIT-V1 — single source of truth for site-level URLs
// + IA. Values pull from env at build time so neither the public docs
// site nor the trading terminal needs to be edited when the live
// hostnames change.

export const SITE = {
  // Where the trading terminal lives. Defaults to local dev port so
  // running both sites side-by-side just works.
  appUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL) ||
    "http://localhost:3000",
  // Docs site's own canonical URL — used only for the homepage hero
  // link / metadata; never hardcoded into navigation. Local default
  // is 3002 because `next dev` for the trading terminal may fall
  // through to 3001 when port 3000 is busy — using 3001 here would
  // collide with the terminal's overflow port.
  docsUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DOCS_URL) ||
    "http://localhost:3002",
  // Public HTTP API placeholder shown in code examples. Defaults to
  // the safe `<deopt-api-host>` token so no production URL is baked
  // into the static site.
  apiHostPlaceholder: "<deopt-api-host>",
  apiHostLocal: "http://localhost:8080",
};

export interface NavItem {
  label: string;
  href: string;
}
export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
  {
    id: "start",
    label: "Start",
    items: [
      { label: "Overview", href: "/" },
      { label: "Quickstart", href: "/quickstart" },
      { label: "Limitations", href: "/limitations" },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    items: [
      { label: "API Overview", href: "/developers" },
      { label: "HTTP API", href: "/developers/http-api" },
      { label: "WebSocket API", href: "/developers/websocket-api" },
      { label: "Wallet Authentication", href: "/developers/wallet-auth" },
      { label: "Signed Intents", href: "/developers/signed-intents" },
      { label: "MM Gateway", href: "/developers/mm-gateway" },
    ],
  },
  {
    id: "academy",
    label: "Academy",
    items: [{ label: "DeOpt Academy", href: "/academy" }],
  },
  {
    id: "protocol",
    label: "Protocol",
    items: [{ label: "Architecture", href: "/protocol" }],
  },
  {
    id: "reference",
    label: "Reference",
    items: [{ label: "Reference Hub", href: "/reference" }],
  },
];
