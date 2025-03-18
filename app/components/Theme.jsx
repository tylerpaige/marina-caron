import { fetchSettings } from "../utilities";

export async function Theme() {
  const defaultTheme = {
    baseFontSize: 20,
    lineHeight: 1.25,
    backgroundColor: "#eff5f8",
    foregroundColor: "#831b48",
    linkColor: "#d42470",
  };

  // Fetch settings from Sanity on the server
  let settings;
  try {
    settings = await fetchSettings();
  } catch (error) {
    console.error(error);
    settings = defaultTheme;
  }

  console.log({settings})

  // Helper to convert hex to rgb string
  const hexToRgb = (hex) => {
    if (!hex) return "0 0 0";
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r} ${g} ${b}`;
  };

  const pxToRem = (px) =>
    `${(px / 16).toFixed(3).replace(/\.?0+$/, "")}rem`;

  // Build the custom CSS
  const customCss = `
    :root {
      --base-font-size: ${pxToRem(settings.baseFontSize)};
      --line-height: ${settings.lineHeight};
      --color-background: ${hexToRgb(settings.backgroundColor)};
      --color-foreground: ${hexToRgb(settings.foregroundColor)};
      --color-link: ${hexToRgb(settings.linkColor)};
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: customCss }} />
  );
}
