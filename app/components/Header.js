"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { fetchSettings } from "../utilities";

function NavItem({ href, children }) {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx("text-inherit", isActive && "underline")}
      >
        {children}
      </Link>
    </li>
  );
}

export async function Header() {
  const settings = await fetchSettings();

  return (
    <header className={clsx()}>
      {/* {JSON.stringify(settings)} */}
      <h1 className={clsx("text-8", "md:text-12")}>
        <Link href="/" className={clsx("text-inherit")}>
          {settings?.siteTitle}
        </Link>
      </h1>
      <nav>
        {settings?.menuItems.map(({ label, href, _key }) => (
          <NavItem key={_key} href={href}>
            {label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
}
