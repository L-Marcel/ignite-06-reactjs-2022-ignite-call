// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTwin = require("./withTwin.js");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: [
    "page.tsx",
    "api.ts",
    "api.tsx"
  ]
});