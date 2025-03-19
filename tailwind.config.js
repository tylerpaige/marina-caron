/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    /*
      {
        '0': '0',
        '1': 'calc(var(--gutter) * 1)',
        '2': 'calc(var(--gutter) * 2)',
        '3': 'calc(var(--gutter) * 3)',
        '4': 'calc(var(--gutter) * 4)',
        DEFAULT: 'calc(var(--gutter) * 1)',
        px: '1px'
      }
    */

    colors: {
      background: "rgb(var(--color-background)/<alpha-value>)",
      foreground: "rgb(var(--color-foreground)/<alpha-value>)",
      link: "rgb(var(--color-link)/<alpha-value>)",
      inherit: "inherit",
    },
    fontFamily: {
      'default-family': ["var(--font-family)"],
    },
    /*
      {
        '-3': '0.707rem'
        '-2': '0.500rem',
        '-1': '0.354rem',
        '0': '1.000rem',
        '1': '1.414rem',
        '2': '1.999rem',
        '3': '2.827rem',
        '4': '3.998rem',
        '5': '5.653rem',
        '6': '7.993rem',
        '7': '11.302rem',
        '8': '15.981rem',
        '9': '22.597rem',
        '10': '31.952rem',
        '11': '45.180rem',
        '12': '63.884rem',
        '13': '90.332rem',
        '14': '127.730rem',
      }
    */
    fontSize: (() => {
      const numberOfSmallSizes = 3;
      const numberOfLargeSizes = 15;
      const scale = 1.125;
      const fontSizes = {};
      Array.from({ length: numberOfSmallSizes }).forEach((_, i) => {
        const key = -1 * (numberOfSmallSizes - i);
        const coefficient = Math.pow(scale, -1 * (numberOfSmallSizes - i)).toFixed(3);
        const fontSize = `calc(var(--font-scale) * var(--base-font-size) * ${coefficient})`;
        fontSizes[key] = [fontSize, 'var(--line-height)'];
      });
      Array.from({ length: numberOfLargeSizes }).forEach((_, i) => {
        const key = i;
        const coefficient = Math.pow(scale, i).toFixed(3);
        const fontSize = `calc(var(--font-scale) * var(--base-font-size) * ${coefficient})`;
        fontSizes[key] = [fontSize, 'var(--line-height)'];
      });
      fontSizes["DEFAULT"] = fontSizes[0];
      return fontSizes;
    })(),
    height: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("keywordSizes"),
      half: "50%",
      third: "33.333333%",
      "two-thirds": "66.666667%",
      quarter: "25%",
      "three-quarters": "75%",
      full: "100%",
      screen: "100vh",
      svh: "100svh",
      lvh: "100lvh",
      dvh: "100dvh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
    }),
    keywordSizes: {
      sm: "20rem",
      md: "30rem",
      lg: "40rem",
      xl: "50rem",
    },
    maxWidth: ({ theme }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...theme("percentages"),
      ...theme("keywordSizes")
    }),
    percentages: {
      half: "50%",
      third: "33.333333%",
      "two-thirds": "66.666667%",
      quarter: "25%",
      "three-quarters": "75%",
      full: "100%",
    },
    screens: {
      sm: "33em",
      md: "48em",
      lg: "75em",
      xl: "105em"
    },
    spacing: (() => {
      // const tinyIntervals = [0, 0.125, 0.25, 0.5, 0.625, 0.75, 0.875, 1.5, 2.5];
      const tinyIntervals = [
        0,
        "1/8",
        "1/4",
        "3/8",
        "1/2",
        "5/8",
        "3/4",
        "7/8",
        "3/2",
        "5/2",
      ];
      const intervals = tinyIntervals.concat(Array.from(Array(96).keys()));
      const spacing = Array.from(intervals).reduce((acc, interval) => {
        const value = `calc(var(--spacer-scale) * var(--gutter) * ${interval})`;
        acc[interval] = value;
        return acc;
      }, {});
      spacing["2em"] = "2em";
      spacing["em"] = "1em";
      spacing["em/2"] = "0.5em";
      spacing["3em/8"] = "0.375em";
      spacing["em/4"] = "0.25em";
      spacing["em/8"] = "0.125em";
      return spacing;
    })(),
    width: ({ theme }) => ({
        auto: "auto",
        ...theme("spacing"),
        ...theme("percentages"),
        ...theme("keywordSizes")
    }),
  },
};
