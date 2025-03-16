"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'
import clsx from "clsx";
import { fetchSettings } from "../utilities";
import { useEffect, useState } from "react";

function NavItem({ href, children }) {
  const pathname = usePathname()
  const isActive = href.startsWith(pathname);

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

export function Header() {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    fetchSettings().then((data) => setSettings(data));
  }, []);

  return (
    <header className={clsx()}>
      {/* {JSON.stringify(settings)} */}
      <h1 className={clsx("text-8", "md:text-12")}>
        <Link href="/" className={clsx("text-inherit")}>
          {settings?.title}
        </Link>
      </h1>
      <nav>
        {settings?.menuItems?.map(({ label, href, _key }) => (
          <NavItem key={_key} href={href}>
            {label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
}
