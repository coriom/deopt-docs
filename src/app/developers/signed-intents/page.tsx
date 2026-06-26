import { Page, Section } from "@/components/Page";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Signed Intents — DeOpt Docs",
};

const FLOW = `1. Client prepares an order.
2. Client requests an execution intent over HTTP.
3. Wallet signs the typed-data payload returned by the backend.
4. Signed payload is submitted to the backend / executor.
5. Executor broadcasts only signed, validated payloads on-chain.
6. WebSocket account streams report positions, balances, history,
   and intent status as underlying sources mature.`;

export default function SignedIntents() {
  return (
    <Page
      eyebrow="Developers"
      title="Signed Intents"
      intro="DeOpt's trading flow: the user signs an intent, the executor broadcasts it. The backend never signs on the user's behalf."
    >
      <Section title="Flow">
        <CodeBlock
          testid="signed-intents-flow"
          language="text"
          label="Trading flow"
          code={FLOW}
        />
      </Section>
      <Section title="Guarantees">
        <ul className="list-inside list-disc space-y-1">
          <li>The backend never signs intents on behalf of the user.</li>
          <li>
            The executor broadcasts only payloads that pass signature and
            constraint validation.
          </li>
          <li>Admin endpoints are not part of the public API.</li>
          <li>
            Intent creation lives at{" "}
            <code>POST /options/execution-intents</code>; WebSocket order
            submission is not in V1.
          </li>
        </ul>
      </Section>
      <Section title="Surfaces involved">
        <ul className="list-inside list-disc space-y-1">
          <li>
            HTTP: prepare and submit the intent, fetch previews, read
            account state.
          </li>
          <li>
            Wallet: sign typed-data payload locally; nothing leaves the
            browser unsigned.
          </li>
          <li>
            WebSocket: stream <code>account.positions</code> /{" "}
            <code>account.portfolio</code> / <code>account.balances</code>{" "}
            / <code>account.history</code> updates as the executor reports
            them.
          </li>
        </ul>
      </Section>
    </Page>
  );
}
