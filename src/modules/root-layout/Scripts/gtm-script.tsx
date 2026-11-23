const GTM_ID = 'G-6PXZLVDQCX';

const GTM_INLINE_SCRIPT = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  console.log('gtag');

  gtag('config', '${GTM_ID}');
`;

/**
 * Rendered directly in the document <head> (not through the route `head`
 * scripts), so the inline script runs once on page load and is not injected
 * again on client-side navigation.
 */
export const GtmScript = () => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <script
        async
        type="text/javascript"
        id="gtag-script"
        dangerouslySetInnerHTML={{ __html: GTM_INLINE_SCRIPT }}
      />
    </>
  );
};
