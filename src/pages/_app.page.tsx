import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { putGlobalStyles } from "../styles/global";

export default function MyApp({
  Component,
  pageProps
}: AppProps) {
  putGlobalStyles();
  return (
    <>
      <Component {...pageProps}/>
      <Analytics/>
    </>
  );
}