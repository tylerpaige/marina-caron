import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react"
import { Theme } from "./components";
import "./globals.css";

export const metadata = {
  title: "Marina Caron",
  description: "Marina Caron is a writer and curator based in New York City.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Theme />
        <Analytics />
      </head>
      <body className={clsx("bg-background", "text-foreground", "font-sans")}>
        {children}
      </body>
    </html>
  );
}
