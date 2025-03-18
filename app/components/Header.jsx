import Link from "next/link";
import clsx from "clsx";
import { fetchSettings } from "../utilities";
import { NavItem } from "./NavItem";

export async function Header() {
  const settings = await fetchSettings();

  return (
    <header className={clsx("pt-2", "px-2")}>
      <h1 className={clsx("text-3", "uppercase", "mb-3")}>
        <Link href="/" className={clsx("text-link")}>
          {settings?.title}
        </Link>
      </h1>
      <nav className="mb-2">
        <ul className="list-none flex gap-x-2em gap-y-em flex-wrap">
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
