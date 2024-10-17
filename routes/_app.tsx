import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="PowerPoint Scraper - Extract key information from PPTX files using AI for optimized data analysis." />
        <meta name="keywords" content="PowerPoint scraper, extract data from pptx, AI, presentation, data analysis, scraping tool, pptx to text, PPTX, LLM" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="PowerPoint Scraper - AI-based PPTX Data Extraction" />
        <meta property="og:description" content="Easily extract key information from PowerPoint files with our AI-powered scraper tool." />
        <meta property="og:url" content="https://powerpoint-scraper.deno.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://powerpoint-scraper.deno.dev/logo.png" />
        <title>PowerPoint Scraper - AI-based PPTX Data Extraction</title>
        <meta name="google-site-verification" content="8zaa0jXsA-lCUhMXM_kvgahrbL3Iev_fSf8pN4GxWvw" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
