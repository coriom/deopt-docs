import { Page, Section } from "@/components/Page";

export const metadata = {
  title: "MM Gateway — DeOpt Docs",
};

const PERMISSIONS = [
  "submit option orders",
  "quote option RFQ",
  "submit perp orders",
  "quote perp RFQ",
  "optional product allowlists",
];

const CAPABILITIES = [
  "bulk submit",
  "bulk cancel",
  "cancel all",
  "quote replace",
  "option RFQ quote",
  "perp RFQ quote",
  "cancel-on-disconnect",
];

export default function MmGateway() {
  return (
    <Page
      eyebrow="Developers"
      title="MM Gateway"
      intro="A separate WebTransport surface for operator-whitelisted market makers. Off by default. Not part of the public API."
    >
      <Section title="Transport">
        <ul className="list-inside list-disc space-y-1">
          <li>WebTransport over QUIC / HTTP3.</li>
          <li>Separate listener (default port <code>:8443</code>).</li>
          <li>TLS required.</li>
          <li>Off by default. Enabled per-deployment by the operator.</li>
        </ul>
        <p
          data-testid="mm-gateway-explicit"
          className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-emerald-100"
        >
          The public API does not expose WebTransport. Normal users and bots
          use HTTP + public/private WebSocket. Only operator-whitelisted
          market makers use the MM Gateway.
        </p>
      </Section>

      <Section title="Permissions">
        <ul
          data-testid="mm-gateway-permissions"
          className="grid gap-1 text-[12px] text-zinc-300 sm:grid-cols-2"
        >
          {PERMISSIONS.map((p) => (
            <li key={p} className="flex items-baseline gap-2">
              <span className="text-zinc-600">·</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Capabilities">
        <ul
          data-testid="mm-gateway-capabilities"
          className="grid gap-1 text-[12px] text-zinc-300 sm:grid-cols-2"
        >
          {CAPABILITIES.map((c) => (
            <li key={c} className="flex items-baseline gap-2">
              <span className="text-zinc-600">·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Posture">
        <ul className="list-inside list-disc space-y-1">
          <li>Permission-gated. Off by default. Not exposed publicly.</li>
          <li>
            Bots and advanced traders are not MMs unless they are
            explicitly operator-whitelisted; they continue to use the
            public HTTP + WebSocket APIs.
          </li>
          <li>
            The MM Gateway never shares its transport, permissions, or
            internal state with the public surface.
          </li>
        </ul>
      </Section>
    </Page>
  );
}
