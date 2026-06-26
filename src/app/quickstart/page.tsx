import { Page, Section } from "@/components/Page";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Quickstart — DeOpt Docs",
};

const CURL = `curl https://<deopt-api-host>/trading/health`;

const WS_BROWSER = `const ws = new WebSocket("wss://<deopt-api-host>/ws");
ws.onopen = () =>
  ws.send(JSON.stringify({
    jsonrpc: "2.0",
    id: "req_1",
    method: "subscribe",
    params: { channel: "trading.health" },
  }));
ws.onmessage = (e) => console.log(JSON.parse(e.data));`;

export default function Quickstart() {
  return (
    <Page
      eyebrow="Start"
      title="Quickstart"
      intro="Read the public health endpoint, subscribe to a WebSocket channel, and authenticate a wallet. Three minutes from zero to live."
    >
      <Section title="1. Read a public HTTP endpoint">
        <p>
          The HTTP API runs on the same Axum listener as the WebSocket. Base
          URL is environment-configurable. For local development the backend
          defaults to <code>http://localhost:8080</code>.
        </p>
        <CodeBlock
          testid="quickstart-curl"
          language="bash"
          label="curl"
          code={CURL}
        />
      </Section>
      <Section title="2. Subscribe to a public WebSocket channel">
        <p>
          The public WebSocket lives at <code>GET /ws</code>. JSON-RPC 2.0
          wire shape with an extended <code>meta</code> block that mirrors
          the HTTP envelope.
        </p>
        <CodeBlock
          testid="quickstart-ws"
          language="javascript"
          label="Browser"
          code={WS_BROWSER}
        />
      </Section>
      <Section title="3. Authenticate a wallet (for account streams)">
        <p>
          Wallet authentication is EIP-191 personal-sign. The server returns
          the exact bytes to sign in <code>auth.challenge</code>; the wallet
          signs them; <code>auth.verify</code> binds the WebSocket session
          to the lower-cased EVM address. See{" "}
          <a
            href="/developers/wallet-auth"
            className="text-emerald-300 underline-offset-2 hover:underline"
          >
            Wallet Authentication
          </a>{" "}
          for the full flow.
        </p>
      </Section>
      <Section title="Conventions">
        <ul className="list-inside list-disc space-y-1">
          <li>
            All examples use the placeholder host{" "}
            <code>{`<deopt-api-host>`}</code>. No production URL is baked in.
          </li>
          <li>
            All responses follow a single envelope shape:{" "}
            <code>{`{ status, data, warnings, meta }`}</code>.
          </li>
          <li>
            Error codes are SCREAMING_SNAKE_CASE and shared between HTTP and
            WebSocket.
          </li>
          <li>
            Mainnet is disabled. Public testnet beta. Unaudited. No real
            funds.
          </li>
        </ul>
      </Section>
    </Page>
  );
}
