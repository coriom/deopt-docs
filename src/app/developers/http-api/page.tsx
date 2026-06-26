import { Page, Section } from "@/components/Page";
import { CodeBlock } from "@/components/CodeBlock";
import { EndpointTable, type EndpointRow } from "@/components/EndpointTable";

export const metadata = {
  title: "HTTP API — DeOpt Docs",
};

const ENVELOPE_OK = `{
  "status": "ok",
  "data": {},
  "warnings": [],
  "meta": {
    "source": "backend",
    "chain_id": 84532,
    "request_id": "req_...",
    "generated_at_ms": 123456789
  }
}`;

const ENVELOPE_ERR = `{
  "status": "error",
  "error": {
    "code": "INVALID_ADDRESS",
    "message": "Invalid EVM address.",
    "details": {}
  },
  "meta": {
    "source": "backend",
    "chain_id": 84532,
    "request_id": "req_...",
    "generated_at_ms": 123456789
  }
}`;

const ROWS: EndpointRow[] = [
  { method: "GET", path: "/trading/health", purpose: "Backend / executor / indexer health.", auth: "Public", status: "live" },
  { method: "GET", path: "/options/products", purpose: "List option products.", auth: "Public", status: "live" },
  { method: "POST", path: "/options/products/batch", purpose: "Resolve a batch of product ids.", auth: "Public", status: "live" },
  { method: "GET", path: "/options/products/{product_id}", purpose: "Single product detail.", auth: "Public", status: "live" },
  { method: "GET", path: "/options/series/{series_id}/details", purpose: "Series detail incl. expiry / strikes.", auth: "Public", status: "live" },
  { method: "POST", path: "/options/quotes/preview", purpose: "Preview a quote.", auth: "Public", status: "live" },
  { method: "POST", path: "/options/exercise/preview", purpose: "Preview an exercise.", auth: "Public", status: "live" },
  { method: "POST", path: "/options/close/preview", purpose: "Preview a close.", auth: "Public", status: "live" },
  { method: "POST", path: "/options/execution-intents", purpose: "Create a signed execution intent.", auth: "Wallet signature flow", status: "live" },
  { method: "GET", path: "/accounts/{address}/positions", purpose: "Open positions.", auth: "Public", status: "live" },
  { method: "GET", path: "/accounts/{address}/portfolio", purpose: "Portfolio summary.", auth: "Public", status: "live" },
  { method: "GET", path: "/accounts/{address}/balances", purpose: "Balances by token.", auth: "Public", status: "live" },
  { method: "GET", path: "/accounts/{address}/history", purpose: "Legacy history feed.", auth: "Public", status: "live" },
  { method: "GET", path: "/accounts/{address}/history/v2", purpose: "Paginated trades / settlements / actions.", auth: "Public", status: "live" },
  { method: "GET", path: "/leaderboard", purpose: "Global ranking by trading volume.", auth: "Public", status: "live" },
];

const ERROR_CODES: Array<{ code: string; meaning: string }> = [
  { code: "INVALID_ADDRESS", meaning: "EVM address failed to parse." },
  { code: "INVALID_REQUEST", meaning: "Malformed JSON or missing fields." },
  { code: "AUTH_REQUIRED", meaning: "Endpoint or channel requires a wallet-authenticated session." },
  { code: "AUTH_EXPIRED", meaning: "Wallet challenge expired before verify." },
  { code: "AUTH_INVALID_SIGNATURE", meaning: "Signature failed to recover a valid signer." },
  { code: "AUTH_ADDRESS_MISMATCH", meaning: "Recovered signer or subscribe address mismatches the bound session." },
  { code: "SOURCE_UNAVAILABLE", meaning: "Backing source returned an error or is not yet wired." },
  { code: "INTERNAL_ERROR", meaning: "Server-side fault — retry, then report if it persists." },
];

export default function HttpApi() {
  return (
    <Page
      eyebrow="Developers"
      title="HTTP API"
      intro="Public REST endpoints. Read-only except for the signed-intent creation route, which receives the wallet-signed payload but never signs on the user's behalf."
    >
      <Section title="Base URL">
        <p>
          Environment-configurable. Examples on this page use the placeholder{" "}
          <code>{`https://<deopt-api-host>`}</code>. For local development
          the backend defaults to <code>http://localhost:8080</code>.
        </p>
        <p className="text-[12px] text-zinc-500">
          Admin endpoints are not part of the public API and are never
          surfaced from the frontend.
        </p>
      </Section>

      <Section title="Endpoints">
        <EndpointTable testid="http-api-endpoint-table" rows={ROWS} />
      </Section>

      <Section title="Response envelope">
        <CodeBlock
          testid="http-api-envelope-ok"
          language="json"
          label="200 OK"
          code={ENVELOPE_OK}
        />
      </Section>
      <Section title="Error envelope">
        <CodeBlock
          testid="http-api-envelope-err"
          language="json"
          label="Error"
          code={ENVELOPE_ERR}
        />
      </Section>
      <Section title="Common error codes">
        <ul
          data-testid="http-api-error-codes"
          className="grid gap-x-3 gap-y-1 text-[12px] sm:grid-cols-2"
        >
          {ERROR_CODES.map((e) => (
            <li key={e.code} className="flex items-baseline gap-2">
              <code className="rounded border border-zinc-800 bg-black/40 px-1.5 text-emerald-200">
                {e.code}
              </code>
              <span className="text-zinc-400">{e.meaning}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
}
