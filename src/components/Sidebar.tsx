"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

export function Sidebar() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Docs"
      className="sticky top-[68px] flex max-h-[calc(100vh-100px)] flex-col gap-4 overflow-y-auto pb-10 text-[13px]"
    >
      {NAV.map((section) => (
        <div
          key={section.id}
          data-testid={`docs-sidebar-section-${section.id}`}
        >
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {section.label}
          </div>
          <ul className="flex flex-col">
            {section.items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active ? "true" : "false"}
                    data-testid={`docs-sidebar-link-${item.href}`}
                    className={
                      active
                        ? "block rounded bg-emerald-500/10 px-2 py-1 text-emerald-200"
                        : "block rounded px-2 py-1 text-zinc-300 hover:bg-emerald-500/5 hover:text-emerald-200"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
