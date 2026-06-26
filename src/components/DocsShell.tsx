import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { Sidebar } from "./Sidebar";

interface DocsShellProps {
  children: ReactNode;
}

/**
 * Three-pane docs shell:
 *   - top bar (server) with DeOpt Docs / app link
 *   - left sidebar (client, reads usePathname)
 *   - main article column with children
 */
export function DocsShell({ children }: DocsShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-200">
      <TopBar />
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 gap-6 px-4 py-6">
        <aside
          aria-label="Docs navigation"
          data-testid="docs-sidebar"
          className="hidden w-56 shrink-0 lg:block"
        >
          <Sidebar />
        </aside>
        <main data-testid="docs-main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header
      data-testid="docs-topbar"
      className="sticky top-0 z-30 border-b border-zinc-900 bg-black/90 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          data-testid="docs-topbar-home"
          className="flex items-center gap-2 text-zinc-100"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded border border-emerald-500/40 bg-emerald-500/10 text-[10px] font-semibold text-emerald-200"
          >
            D
          </span>
          <span className="text-[14px] font-semibold tracking-tight">
            DeOpt Docs
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-[12px]">
          <Link
            href="/developers"
            className="rounded border border-zinc-800 bg-black/40 px-2 py-1 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-200"
            data-testid="docs-topbar-developers"
          >
            Developers
          </Link>
          <Link
            href="/academy"
            className="rounded border border-zinc-800 bg-black/40 px-2 py-1 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-200"
            data-testid="docs-topbar-academy"
          >
            Academy
          </Link>
          <a
            href={SITE.appUrl}
            data-testid="docs-topbar-open-app"
            className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-emerald-200 hover:bg-emerald-500/20"
          >
            Open App
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      data-testid="docs-footer"
      className="border-t border-zinc-900 bg-black/80 py-4 text-center text-[11px] text-zinc-500"
    >
      Base Sepolia testnet beta · Unaudited · Mainnet disabled · No real
      funds.
    </footer>
  );
}
