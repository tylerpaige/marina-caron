import clsx from "clsx";
import "./globals.css";

export const metadata = {
  title: "Marina Caron",
  description: "Marina Caron is a writer and curator based in New York City.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx("bg-background", "text-foreground", "font-sans")}>
        {children}
      </body>
    </html>
  );
}
