export type StatusKind = "live" | "deferred" | "reserved" | "beta";

const STYLE: Record<StatusKind, string> = {
  live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  deferred: "border-zinc-700 bg-zinc-900 text-zinc-400",
  reserved: "border-zinc-800 bg-black/40 text-zinc-300",
  beta: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
};

const LABEL: Record<StatusKind, string> = {
  live: "Live",
  deferred: "Deferred",
  reserved: "Reserved",
  beta: "Beta",
};

export function StatusBadge({ kind }: { kind: StatusKind }) {
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] ${STYLE[kind]}`}
    >
      {LABEL[kind]}
    </span>
  );
}
