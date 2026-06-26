import { Page, Section } from "@/components/Page";

export const metadata = {
  title: "Limitations — DeOpt Docs",
};

export default function Limitations() {
  return (
    <Page
      eyebrow="Start"
      title="Limitations"
      intro="What does not work yet, what is intentionally absent, and what to expect during the public testnet beta."
    >
      <Section title="Scope">
        <ul className="list-inside list-disc space-y-1">
          <li>Base Sepolia only. Mainnet is disabled.</li>
          <li>Unaudited. Do not deposit real funds.</li>
          <li>No real funds anywhere in the system.</li>
          <li>Public addresses, chain IDs, and ABIs may change without notice.</li>
        </ul>
      </Section>
      <Section title="Public API surface">
        <ul className="list-inside list-disc space-y-1">
          <li>
            No public WebSocket order submission. Signed intent creation
            stays on HTTP.
          </li>
          <li>
            No public orderbook, trades, ticker, oracle, or mark-price
            channels. Those names are reserved but the data sources do not
            exist yet — channels return errors rather than fabricated data.
          </li>
          <li>
            Five private <code>account.*</code> channels return honest
            empty arrays until their backend sources land:{" "}
            <code>orders</code>, <code>fills</code>,{" "}
            <code>intent_status</code>, <code>settlements</code>,{" "}
            <code>liquidations</code>.
          </li>
          <li>Admin endpoints are not part of the public API.</li>
        </ul>
      </Section>
      <Section title="Operator-whitelisted MM gateway">
        <ul className="list-inside list-disc space-y-1">
          <li>
            The MM gateway runs on a separate WebTransport listener (QUIC /
            HTTP3) and is off by default.
          </li>
          <li>
            Access is restricted to operator-whitelisted market makers; the
            public API does not expose WebTransport.
          </li>
          <li>
            Permissions (submit, quote, RFQ) are operator-controlled and
            never readable from the public surface.
          </li>
        </ul>
      </Section>
      <Section title="Wallet authentication">
        <ul className="list-inside list-disc space-y-1">
          <li>
            EIP-191 personal-sign. The wallet must sign the exact{" "}
            <code>message</code> field returned by{" "}
            <code>auth.challenge</code> — whitespace, casing, or chain-id
            changes invalidate the signature.
          </li>
          <li>
            Nonces are single-use; failed verifies still consume the nonce.
            Retry requires a fresh <code>auth.challenge</code>.
          </li>
          <li>
            Sessions are bound to the recovered address; cross-wallet
            subscribe attempts return <code>AUTH_ADDRESS_MISMATCH</code>.
          </li>
        </ul>
      </Section>
    </Page>
  );
}
