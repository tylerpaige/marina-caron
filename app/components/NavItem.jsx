"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'
import clsx from "clsx";

export function NavItem({ href, children }) {
  const pathname = usePathname()
  const isActive = pathname !== "/" ? href.startsWith(pathname) : href === pathname;

  return (
    <li>
      <Link
        href={href}
        className={clsx("text-inherit", "uppercase", isActive ? "underline underline-offset-[0.25em] decoration-[1px]" : "no-underline")}
      >
        {children}
      </Link>
    </li>
  );
}
