import { BackToTop, Footer, Header } from '@components';
import { ILayoutProps } from '@interfaces';
import getConfig from 'next/config';
import Head from 'next/head';

const Layout = (props: ILayoutProps) => {
  const {
    children,
    headerData,
    footerData,
    notificationData,
    seoData,
    className = '',
    isHomePage,
    mainBannerData,
  } = props;
  const { publicRuntimeConfig } = getConfig();

  const metaDescription = seoData?.metaDescription || 'Adani International School';
  const metaKeywords = seoData?.metaKeywords || 'Adani International School';
  const browserTitle = seoData?.browserTitle || 'Adani International School';
  const ogDescription = seoData?.ogDescription || '';
  const ogTitle = seoData?.ogTitle || '';
  const ogImage = seoData?.ogImage || '';
  const robotsTags = seoData?.robotsTags || '';
  const ogKeywords = seoData?.ogKeyword || '';
  const canonicalUrl = seoData?.canonicalUrl || '';
  const googleSiteVerification = seoData?.googleSiteVerification || '';
  const msValidate = seoData?.msValidate || '';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Head>
        <title>{browserTitle}</title>
        <meta name="keywords" content={metaKeywords} />
        <meta name="description" content={metaDescription} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
          key="meta_viewport"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${publicRuntimeConfig.baseImagePath}assets/images/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${publicRuntimeConfig.baseImagePath}assets/images/favicon-16x16.png`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content={robotsTags} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:keywords" content={ogKeywords} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="google-site-verification" content={googleSiteVerification} />
        <meta name="msvalidate_01" content={msValidate} />
        {isHomePage && mainBannerData && <link rel="preload" href={`${currentUrl + mainBannerData}`} as="image" />}
        <script
          id="schemaData"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Organization',
              name: seoData?.orgSchema?.name || 'Adani International School',
              url: seoData?.orgSchema?.url || 'https://www.adaniinternationalschool.org/',
              logo: seoData?.orgSchema?.logo || '',
              address: {
                '@type': 'PostalAddress',
                streetAddress: seoData?.orgSchema?.streetAddress || '',
                addressRegion: seoData?.orgSchema?.addressRegion || 'IN',
                postalCode: seoData?.orgSchema?.postalCode || '382421',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: seoData?.orgSchema?.telephone || '',
                contactType: seoData?.orgSchema?.contactType || 'customer service',
                areaServed: seoData?.orgSchema?.areaServed || 'India',
              },
              sameAs: seoData?.orgSchema?.sameAs || [''],
            }),
          }}
        />
      </Head>
      <main className={className}>
        {headerData && <Header headerData={headerData} notificationData={notificationData} />}
        {children}
        <BackToTop />
        {footerData && <Footer footerData={footerData} />}
      </main>
    </>
  );
};

export default Layout;
