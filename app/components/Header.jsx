import Link from "next/link";
import clsx from "clsx";
import { fetchSettings } from "../utilities";
import { NavItem } from "./NavItem";

export async function Header() {
  const settings = await fetchSettings();

  return (
    <header className={clsx("pt-2")}>
      <h1 className={clsx("text-3", "uppercase", "mb-2")}>
        <Link href="/" className={clsx("text-link")}>
          {settings?.title}
        </Link>
      </h1>
      <nav className="mb-1">
        <ul className="list-none flex space-x-2em">
          {settings?.menuItems?.map(({ label, href, _key }) => (
            <NavItem key={_key} href={href}>
              {label}
            </NavItem>
          ))}
        </ul>
      </nav>
    </header>
  );
}
