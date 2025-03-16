import { fetchSettings } from "../utilities";

export async function Theme() {
  const defaultTheme = {
    backgroundColor: "#eff5f8",
    foregroundColor: "#831b48",
    linkColor: "#d42470",
  };

  // Fetch settings from Sanity on the server
  const settings = (await fetchSettings()) || defaultTheme;

  // Helper to convert hex to rgb string
  const hexToRgb = (hex) => {
    if (!hex) return "0 0 0";
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r} ${g} ${b}`;
  };

  // Build the custom CSS
  const customCss = `
    :root {
      --color-background: ${hexToRgb(settings.backgroundColor)};
      --color-foreground: ${hexToRgb(settings.foregroundColor)};
      --color-link: ${hexToRgb(settings.linkColor)};
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: customCss }} />
  );
}
