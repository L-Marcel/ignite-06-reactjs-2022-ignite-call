import Head from "next/head";
import { ReactNode } from "react";

interface SeoProps {
  title: string;
  description?: string;
  author?: string;
  pageType?: "website" | "article";
  article?: {
    author: string;
    publishedAt?: string | Date;
    updatedAt?: string | Date;
  };
  children: ReactNode;
  keywords?: string[];
  ogUrl?: string;
  sharedUrl: string;
  ogType?: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

export function Seo({
  title,
  description = "",
  pageType = "website",
  author = "",
  keywords = ["Next.js"],
  children,
  robots = {
    follow: true,
    index: true
  },
  sharedUrl,
  ogUrl,
  ogType = "image/jpg",
  article = {
    author: ""
  }
}: SeoProps) {
  //após implementar você pode testar em: https://www.linkedin.com/post-inspector/inspect/
  //after deploy you can test in: https://www.linkedin.com/post-inspector/inspect/

  const isAnArtcile = pageType === "article";

  const ogUrlHaveHttps = ogUrl && ogUrl?.startsWith("https://");
  const shortOgUrl = ogUrlHaveHttps? 
    ogUrl?.replace("https:", ""):
    ogUrl?.replace("http:", "");

  const sharedUrlHaveHttps = sharedUrl && sharedUrl?.startsWith("https://");
  const shortSharedUrl = sharedUrlHaveHttps? 
    sharedUrl?.replace("https:", ""):
    sharedUrl?.replace("http:", "");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords.join(", ")}></meta>
        <meta name="author" content={author}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content={`${robots.index? "index":"noindex"} ${robots.follow? "follow":"nofollow"}`}/>
        { ogUrl && <>
          <meta
            property="og:image"
            itemProp="image"
            content={`${shortOgUrl}`}
          />
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={description}/>
          <meta property="og:type" content={pageType}/>
          <meta property="og:url" content={shortSharedUrl}/>
          <meta property="og:image:type" content={ogType}/>
        </> }
          
        {
          isAnArtcile && <>
            <meta name="article:author" content={article.author}/>
            {
              article.publishedAt && <meta name="article:published_time" content={new Date(article.publishedAt).toISOString()}/>
            }
            {
              article.updatedAt && <meta name="article:modified_time" content={new Date(article.updatedAt).toISOString()}/>
            }
          </>
        }
      </Head>
      {children}
    </>
  );
}