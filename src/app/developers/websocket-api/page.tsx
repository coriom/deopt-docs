import { Page, Section } from "@/components/Page";
import { CodeBlock } from "@/components/CodeBlock";
import { ChannelTable, type ChannelRow } from "@/components/ChannelTable";

export const metadata = {
  title: "WebSocket API — DeOpt Docs",
};

const REQ_SUBSCRIBE = `{
  "jsonrpc": "2.0",
  "id": "req_1",
  "method": "subscribe",
  "params": { "channel": "trading.health" }
}`;

const ACK_SUBSCRIBE = `{
  "jsonrpc": "2.0",
  "id": "req_1",
  "result": { "subscribed": true, "subscription_id": "sub_..." },
  "meta": {
    "source": "backend",
    "chain_id": 84532,
    "request_id": "req_...",
    "generated_at_ms": 123456789
  }
}`;

const PUSH = `{
  "jsonrpc": "2.0",
  "method": "subscription",
  "params": {
    "subscription_id": "sub_...",
    "channel": "trading.health",
    "seq": 0,
    "event_id": "evt_...",
    "generated_at_ms": 123456789,
    "data": {}
  }
}`;

const UNSUBSCRIBE = `{
  "jsonrpc": "2.0",
  "id": "req_2",
  "method": "unsubscribe",
  "params": { "subscription_id": "sub_..." }
}`;

const PING = `{
  "jsonrpc": "2.0",
  "id": "req_3",
  "method": "ping"
}`;

const METHODS: Array<{ method: string; direction: string; purpose: string }> = [
  { method: "ping", direction: "client → server", purpose: "Liveness check; server replies with server-time + chain id." },
  { method: "subscribe", direction: "client → server", purpose: "Subscribe to a channel; first snapshot is pushed immediately." },
  { method: "unsubscribe", direction: "client → server", purpose: "Remove a subscription by id." },
  { method: "subscriptions", direction: "client → server", purpose: "List active subscriptions on this connection." },
  { method: "session.get", direction: "client → server", purpose: "Return session id, auth state, bound address, subscriptions." },
  { method: "auth.challenge", direction: "client → server", purpose: "Issue a single-use challenge + canonical message." },
  { method: "auth.verify", direction: "client → server", purpose: "Recover the EIP-191 signer and bind the session." },
  { method: "subscription", direction: "server → client", purpose: "Push frame (snapshot or periodic update)." },
];

const PUBLIC_CHANNELS: ChannelRow[] = [
  { name: "trading.health", status: "live", source: "/trading/health" },
  { name: "options.products", status: "live", source: "/options/products" },
  { name: "leaderboard", status: "live", source: "/leaderboard" },
];

const DEFERRED_CHANNELS: ChannelRow[] = [
  { name: "options.orderbook", status: "deferred", source: "no public source yet" },
  { name: "options.trades", status: "deferred", source: "no public source yet" },
  { name: "options.ticker", status: "deferred", source: "no public source yet" },
  { name: "oracle.price", status: "deferred", source: "no public source yet" },
  { name: "mark.price", status: "deferred", source: "no public source yet" },
];

const PRIVATE_CHANNELS: ChannelRow[] = [
  { name: "account.positions", status: "live", source: "account_positions HTTP handler" },
  { name: "account.portfolio", status: "live", source: "account_portfolio HTTP handler" },
  { name: "account.balances", status: "live", source: "account_balances HTTP handler" },
  { name: "account.history", status: "live", source: "account_history_v2 (last_month, page=1, page_size=100)" },
  { name: "account.orders", status: "reserved", source: "honest empty array" },
  { name: "account.fills", status: "reserved", source: "honest empty array" },
  { name: "account.intent_status", status: "reserved", source: "honest empty array" },
  { name: "account.settlements", status: "reserved", source: "honest empty array" },
  { name: "account.liquidations", status: "reserved", source: "honest empty array" },
];

export default function WebSocketApi() {
  return (
    <Page
      eyebrow="Developers"
      title="WebSocket API"
      intro="Browser-compatible WebSocket at GET /ws. JSON-RPC 2.0 wire shape with an extended meta block. Public reads only — order submission stays on HTTP."
    >
      <Section title="Endpoint">
        <p>
          <code>GET /ws</code> on the same listener as the public HTTP API.
          Public and private subscriptions share the connection. Private{" "}
          <code>account.*</code> channels require wallet authentication
          first.
        </p>
        <p
          data-testid="websocket-api-no-orders-warning"
          className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-emerald-100"
        >
          WebSocket order submission is not public/live in V1 unless a
          later milestone implements it. Signed intent creation remains
          HTTP (<code>POST /options/execution-intents</code>).
        </p>
      </Section>

      <Section title="Methods">
        <div className="overflow-hidden rounded-md border border-zinc-900">
          <table
            data-testid="websocket-api-method-table"
            className="w-full min-w-full border-separate border-spacing-0 text-[12px]"
          >
            <thead className="bg-zinc-950 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
              <tr>
                <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Method
                </th>
                <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Direction
                </th>
                <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {METHODS.map((m) => (
                <tr key={m.method} className="hover:bg-zinc-900/40">
                  <td
                    className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-emerald-200"
                    style={{ fontFamily: "var(--app-font-mono)" }}
                  >
                    {m.method}
                  </td>
                  <td className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-zinc-400">
                    {m.direction}
                  </td>
                  <td className="border-b border-zinc-900 px-3 py-1.5 text-zinc-300">
                    {m.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Wire examples">
        <div className="grid gap-2 lg:grid-cols-2">
          <CodeBlock testid="ws-req-subscribe" language="json" label="subscribe" code={REQ_SUBSCRIBE} />
          <CodeBlock testid="ws-ack-subscribe" language="json" label="server ack" code={ACK_SUBSCRIBE} />
          <CodeBlock testid="ws-push" language="json" label="push event" code={PUSH} />
          <CodeBlock testid="ws-unsubscribe" language="json" label="unsubscribe" code={UNSUBSCRIBE} />
          <CodeBlock testid="ws-ping" language="json" label="ping" code={PING} />
        </div>
      </Section>

      <Section title="Channels">
        <div className="grid gap-3 lg:grid-cols-2">
          <ChannelTable
            testid="ws-public-channels"
            title="Public — live"
            rows={PUBLIC_CHANNELS}
          />
          <ChannelTable
            testid="ws-deferred-channels"
            title="Deferred — no fabricated data"
            rows={DEFERRED_CHANNELS}
          />
        </div>
        <ChannelTable
          testid="ws-private-channels"
          title="Private (wallet-authenticated)"
          rows={PRIVATE_CHANNELS}
        />
      </Section>
    </Page>
  );
}
