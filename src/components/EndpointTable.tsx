import { StatusBadge, type StatusKind } from "./StatusBadge";

export interface EndpointRow {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  purpose: string;
  auth: string;
  status: StatusKind;
}

export function EndpointTable({
  rows,
  testid,
}: {
  rows: EndpointRow[];
  testid?: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-900">
      <table
        data-testid={testid}
        className="w-full min-w-full border-separate border-spacing-0 text-[12px]"
      >
        <thead className="bg-zinc-950 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          <tr>
            <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-left font-medium">
              Method
            </th>
            <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
              Path
            </th>
            <th className="border-b border-zinc-900 px-3 py-2 text-left font-medium">
              Purpose
            </th>
            <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-left font-medium">
              Auth
            </th>
            <th className="whitespace-nowrap border-b border-zinc-900 px-3 py-2 text-left font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={`${r.method} ${r.path}`}
              data-testid={`endpoint-row-${r.method}-${r.path}`}
              className="hover:bg-zinc-900/40"
            >
              <td
                className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-emerald-300"
                style={{ fontFamily: "var(--app-font-mono)" }}
              >
                {r.method}
              </td>
              <td
                className="border-b border-zinc-900 px-3 py-1.5 text-zinc-100"
                style={{ fontFamily: "var(--app-font-mono)" }}
              >
                {r.path}
              </td>
              <td className="border-b border-zinc-900 px-3 py-1.5 text-zinc-300">
                {r.purpose}
              </td>
              <td className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5 text-zinc-300">
                {r.auth}
              </td>
              <td className="whitespace-nowrap border-b border-zinc-900 px-3 py-1.5">
                <StatusBadge kind={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
