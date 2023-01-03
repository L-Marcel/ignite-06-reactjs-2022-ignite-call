import { AppProps } from "next/app";
import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({
  Component,
  pageProps
}: AppProps) {
  return (
    <>
      <Component {...pageProps}/>
      <Analytics/>
    </>
  );
}