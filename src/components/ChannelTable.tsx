import { StatusBadge, type StatusKind } from "./StatusBadge";

export interface ChannelRow {
  name: string;
  status: StatusKind;
  source: string;
}

export function ChannelTable({
  title,
  rows,
  testid,
}: {
  title: string;
  rows: ChannelRow[];
  testid?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-900">
      <div className="border-b border-zinc-900 bg-zinc-950 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          {title}
        </span>
      </div>
      <table
        data-testid={testid}
        className="w-full min-w-full border-separate border-spacing-0 text-[12px]"
      >
        <thead className="bg-zinc-950 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          <tr>
            <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-left font-medium">
              Channel
            </th>
            <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-left font-medium">
              Status
            </th>
            <th className="border-b border-zinc-900 px-3 py-1.5 text-left font-medium">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="hover:bg-zinc-900/40">
              <td
                className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-zinc-100"
                style={{ fontFamily: "var(--app-font-mono)" }}
              >
                {r.name}
              </td>
              <td className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5">
                <StatusBadge kind={r.status} />
              </td>
              <td className="border-b border-zinc-900 px-3 py-1.5 text-zinc-400">
                {r.source}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
