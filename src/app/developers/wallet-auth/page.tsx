import { Page, Section } from "@/components/Page";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Wallet Authentication — DeOpt Docs",
};

const CANONICAL = `DeOpt Public WebSocket Authentication

Address: <lower-case 0x...>
Chain ID: <u64>
Nonce: nonce_<uuid>
Issued At: <i64 ms>
Expires At: <i64 ms>
Domain: deopt-v2-public-ws`;

const CHALLENGE_REQ = `{
  "jsonrpc": "2.0",
  "id": "auth_1",
  "method": "auth.challenge",
  "params": { "address": "0x..." }
}`;

const CHALLENGE_RES = `{
  "jsonrpc": "2.0",
  "id": "auth_1",
  "result": {
    "address": "0x...",
    "message": "DeOpt Public WebSocket Authentication\\n\\nAddress: 0x...\\nChain ID: 84532\\nNonce: nonce_...\\nIssued At: ...\\nExpires At: ...\\nDomain: deopt-v2-public-ws",
    "expires_at_ms": 123456789
  }
}`;

const VERIFY_REQ = `{
  "jsonrpc": "2.0",
  "id": "auth_2",
  "method": "auth.verify",
  "params": { "address": "0x...", "signature": "0x..." }
}`;

const VERIFY_RES = `{
  "jsonrpc": "2.0",
  "id": "auth_2",
  "result": { "authenticated": true, "address": "0x..." }
}`;

const PERSONAL_SIGN = `// 1. auth.challenge → server returns result.message (exact bytes).
// 2. Sign those bytes with the wallet — no transformation.
const signature = await window.ethereum.request({
  method: "personal_sign",
  params: [message, address],
});

// 3. auth.verify with { address, signature }.
ws.send(JSON.stringify({
  jsonrpc: "2.0",
  id: "auth_2",
  method: "auth.verify",
  params: { address, signature },
}));`;

export default function WalletAuth() {
  return (
    <Page
      eyebrow="Developers"
      title="Wallet Authentication"
      intro="EIP-191 personal-sign over a canonical challenge message. The server never signs; it only recovers the signer and binds the WebSocket session to the address."
    >
      <Section title="Flow">
        <ol className="list-inside list-decimal space-y-1 text-zinc-300">
          <li>
            <code>auth.challenge</code> — client sends the wallet address.
          </li>
          <li>
            Backend returns the canonical <code>message</code> field — the
            exact bytes the wallet must sign.
          </li>
          <li>Wallet performs EIP-191 <code>personal_sign</code> over those bytes.</li>
          <li><code>auth.verify</code> — client submits the signature.</li>
          <li>
            Server recovers the signer and binds the session to the
            lower-cased EVM address. Nonce is consumed regardless of
            outcome — single-use.
          </li>
          <li>
            Private <code>account.*</code> channels become subscribable for
            that address only.
          </li>
        </ol>
      </Section>

      <Section title="Canonical message — byte-for-byte">
        <CodeBlock
          testid="wallet-auth-canonical"
          language="text"
          label="Signed message"
          code={CANONICAL}
        />
        <p
          data-testid="wallet-auth-warning"
          className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-emerald-100"
        >
          Whitespace, casing, or chain-id changes invalidate the signature.
          Sign the exact <code>message</code> bytes returned by{" "}
          <code>auth.challenge</code>.
        </p>
      </Section>

      <Section title="Wire examples">
        <div className="grid gap-2 lg:grid-cols-2">
          <CodeBlock testid="wallet-auth-challenge-req" language="json" label="auth.challenge — request" code={CHALLENGE_REQ} />
          <CodeBlock testid="wallet-auth-challenge-res" language="json" label="auth.challenge — response" code={CHALLENGE_RES} />
          <CodeBlock testid="wallet-auth-verify-req" language="json" label="auth.verify — request" code={VERIFY_REQ} />
          <CodeBlock testid="wallet-auth-verify-res" language="json" label="auth.verify — response" code={VERIFY_RES} />
        </div>
      </Section>

      <Section title="Browser pseudo-code">
        <CodeBlock
          testid="wallet-auth-personal-sign"
          language="javascript"
          label="window.ethereum"
          code={PERSONAL_SIGN}
        />
      </Section>

      <Section title="Address binding">
        <ul className="list-inside list-disc space-y-1">
          <li>Sessions are bound to the recovered, lower-cased EVM address.</li>
          <li>
            On <code>subscribe</code> to a private channel, a supplied{" "}
            <code>params.address</code> cannot override the bound session —
            mismatches return <code>AUTH_ADDRESS_MISMATCH</code>.
          </li>
          <li>
            Re-authenticating to a different address does not retroactively
            move active subscriptions; unsubscribe and re-subscribe.
          </li>
        </ul>
      </Section>
    </Page>
  );
}
