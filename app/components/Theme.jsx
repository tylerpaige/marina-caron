import { fetchSettings } from "../utilities";

export async function Theme() {
  const defaultTheme = {
    spacerScale: 1,
    fontScale: 1,
    lineHeight: 1.25,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#eff5f8",
    foregroundColor: "#831b48",
    linkColor: "#d42470",
    customCss: "",
    customHtml: "",
  };

  // Fetch settings from Sanity on the server
  let settings;
  try {
    settings = await fetchSettings();
  } catch (error) {
    console.error(error);
    settings = defaultTheme;
  }

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
      --spacer-scale: ${settings.spacerScale || defaultTheme.spacerScale};
      --font-scale: ${settings.fontScale || defaultTheme.fontScale};
      --line-height: ${settings.lineHeight || defaultTheme.lineHeight};
      --font-family: ${settings.fontFamily || defaultTheme.fontFamily};
      --color-background: ${hexToRgb(settings.backgroundColor || defaultTheme.backgroundColor)};
      --color-foreground: ${hexToRgb(settings.foregroundColor || defaultTheme.foregroundColor)};
      --color-link: ${hexToRgb(settings.linkColor || defaultTheme.linkColor)};
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customCss + settings.customCss }} />
      {settings.customHtml && (
        <div dangerouslySetInnerHTML={{ __html: settings.customHtml }} />
      )}
    </>
  );
}
