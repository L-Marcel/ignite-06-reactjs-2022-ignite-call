import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { putGlobalStyles } from "../styles/global";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  putGlobalStyles();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
      <Analytics/>
    </SessionProvider>
  );
}