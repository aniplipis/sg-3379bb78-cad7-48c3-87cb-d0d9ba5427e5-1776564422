import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "MAX SAHAM",
  description = "Max Saham is Malaysia’s leading FCPO trading education platform specialising in Smart Money Concepts (SMC), Wyckoff Method, and intraday futures trading strategies.\n\nWe help new and intermediate traders build confidence, discipline, and consistency through structured learning, real-time market analysis, and practical execution",
  image = "/og-image.png",
  url,
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
