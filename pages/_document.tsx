import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VWNVMP678W"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VWNVMP678W');
            `,
          }}
        />
      </Head>
  <body className="antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
