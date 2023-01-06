import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { putGlobalStyles } from "../styles/global";
import { SessionProvider } from "next-auth/react";
import "../lib/dayjs";
import { queryClient } from "../lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";

export default function MyApp({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  putGlobalStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: "",
            siteName: "Ignite Call"
          }}
        />
        <Component {...pageProps}/>
        <Analytics/>
      </SessionProvider>
    </QueryClientProvider>
  );
}