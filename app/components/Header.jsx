import Link from "next/link";
import clsx from "clsx";
import { fetchSettings } from "../utilities";
import { NavItem } from "./NavItem";

export async function Header() {
  const settings = await fetchSettings();

  return (
    <header className={clsx()}>
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
