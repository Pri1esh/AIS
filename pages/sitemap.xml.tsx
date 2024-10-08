import { ENDPOINT, getAPI } from '@api-manager';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const response = await getAPI(ENDPOINT.SSR.sitemapXMLApi);
    const data = apiDataFilter(response);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${data?.main?.SiteMapXML?.fields
        ?.map((item: { url: string; lastmod: string; priority: string }) => {
          return `
            <url>
              <loc>${item?.url}</loc>
              <lastmod>${item?.lastmod}</lastmod>    
              <priority>${item?.priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { data: null, error: 'Uh oh! Looks like there is some network issue.' },
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapIndex() {
  /*function 'SitemapIndex' is empty */
}
