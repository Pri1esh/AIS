import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, PageDescription, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';

const AboutusPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, footer, header } = data;
  const { mainBanner = null, subNav = null, Aboutus = null } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={main?.seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} isHeading={false} />}
      {subNav?.fields?.subNavItems && <SubNav compData={subNav?.fields?.subNavItems} />}
      {Aboutus?.fields && <PageDescription compData={Aboutus?.fields} isHeading={true} />}
    </Layout>
  );
};

export default AboutusPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.aboutUsPage);
    const data = apiDataFilter(res);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: 'Uh oh! Looks like there is some network issue.',
        errorMessage: JSON.stringify(error),
      },
    };
  }
};
