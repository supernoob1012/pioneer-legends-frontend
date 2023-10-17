import { Html, Head, Main, NextScript } from "next/document";

const MyDocument: React.FC = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Include Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Russo+One&family=Saira:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
