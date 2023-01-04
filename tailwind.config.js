// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokens = require("@lm-ignite/ignite-tokens");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ...tokens.tailwindColors
      },
      fontFamily: {
        roboto: [tokens.fonts.default],
        monospace: [tokens.fonts.code]
      },
      fontSize: {
        ...tokens.fontSizes,
        ...Object.entries(tokens.headingFontSizes).reduce((prev, [key, value]) => {
          prev[`heading-${key}`] = value;
          return prev;
        }, {})
      },
      fontWeight: {
        ...tokens.fontWeights
      },
      lineHeight: {
        ...tokens.lineHeights
      },
      borderRadius: {
        ...tokens.radii
      }
    },
  },
  variants: {
    extends: {
      scrollbar: ["dark"]
    }
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
