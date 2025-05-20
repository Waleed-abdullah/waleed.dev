/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';

import Script from 'next/script';

export const GtmScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-6PXZLVDQCX"
        strategy="beforeInteractive"
      />
      <Script
        async
        type="text/javascript"
        id="gtag-script"
        strategy="beforeInteractive"
      >
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  console.log('gtag');

  gtag('config', 'G-6PXZLVDQCX');
`}
      </Script>
    </>
  );
};
