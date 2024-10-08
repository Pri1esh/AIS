import { ENDPOINT, getAPI } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, Routes, SubNav } from '@components';
import { IPage } from '@interfaces';
import { apiDataFilter } from '@utils';
import type { GetServerSideProps, NextPage } from 'next';

const TransportationPage: NextPage<IPage> = (props) => {
  const { data, error, errorMessage } = props;

  if (error || !data) {
    return <ErrorFallback description={error} errorMessage={errorMessage} />;
  }

  const { main, header, footer } = data;
  const { mainBanner = null, seoData = null, subNav = null, transports = null } = main;

  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      {mainBanner?.fields && <HeroBanner compData={mainBanner?.fields} />}
      {subNav?.fields && <SubNav compData={subNav?.fields?.subNavItems} />}
      {transports?.fields && <Routes compData={transports?.fields} />}
    </Layout>
  );
};

export default TransportationPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await getAPI(ENDPOINT.SSR.transportationPage);
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
